package com.sjasoft.pmis.controller;

import com.github.pagehelper.PageInfo;
import com.sjasoft.framework.annotation.SystemLog;
import com.sjasoft.framework.bean.ResultBean;
import com.sjasoft.pmis.mybatis.extend.entity.Bug;
import com.sjasoft.pmis.mybatis.generate.entity.SysLog;
import com.sjasoft.pmis.mybatis.generate.entity.SysUser;
import com.sjasoft.pmis.mybatis.generate.entity.TProjectBug;
import com.sjasoft.pmis.service.BugService;
import com.sjasoft.pmis.service.LogService;
import com.sjasoft.pmis.service.UserService;
import com.sun.org.apache.regexp.internal.RE;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by hj on 2019/6/12.
 * 项目BugController
 */
@RestController
@RequestMapping(value = "bug")
public class BugController {

    @Autowired
    private BugService bugService;

    @Autowired
    private LogService logService;

    @Autowired
    private UserService userService;

    /**
     * 新增项目Bug
     * @param request
     * @param tProjectBug
     * @return
     */
    @SystemLog("新增项目Bug")
    @PostMapping(value = "insertProjectBug")
    public ResultBean insertProjectBug(HttpServletRequest request, TProjectBug tProjectBug) {
        SysUser sysUser = userService.getLoginUser(request);
        try {
            if (bugService.checkInsertBugName(tProjectBug.getTaskName())==false){
                return ResultBean.failure("Bug名称已存在，请重新输入！");
            }
            tProjectBug = bugService.insertProjectBug(sysUser, tProjectBug);
            logService.insertLogInfo(sysUser.getLoginName(),"insertProjectBug",tProjectBug.getId(),tProjectBug.getTaskName(),"新增项目Bug",null,null);
            return ResultBean.success("新增项目Bug成功！");
        } catch (Exception ex) {
            String errorInfo = "";
            for(StackTraceElement elem : ex.getStackTrace()) {
                errorInfo  += String.valueOf(elem) ;
            }
            logService.insertLogInfo(sysUser.getLoginName(),errorInfo,"SYS_ERR",tProjectBug.getTaskName(),"新增项目Bug",ex.getCause().toString(),ex.getMessage());
            ex.printStackTrace();
            return ResultBean.failure("新增项目Bug失败！");
        }
    }

    /**
     * 获取项目下的Bug列表
     * @param page 当前页数
     * @param limit 分页数
     * @param proId 项目ID
     * @return 需求列表
     */
    @SystemLog("获取项目下的Bug列表")
    @GetMapping(value = "getBugList")
    public ResultBean getBugList(Integer page, Integer limit, String proId,String taskName,String personName,String creator,Date createTime,String item) {
        List<Bug> bugList = new ArrayList<>();
        try {
            bugList = bugService.getBugList(page, limit, proId,taskName,personName,creator,createTime,item);
            if(bugList.size() > 0){
                return ResultBean.success("获取Bug信息一览成功", new PageInfo<>(bugList));
            }else {
                return ResultBean.success("暂无数据", new PageInfo<>(bugList));
            }

        } catch (Exception ex) {
            ex.printStackTrace();
            return ResultBean.failure("获取Bug信息一览失败");
        }
    }

    /**
     * 根据ID查询Bug明细
     * @param id
     * @return
     */
    @SystemLog("根据ID查询Bug明细")
    @GetMapping(value = "getBugById")
    public ResultBean getBugById(String id) {
        try {
            return ResultBean.success("获取Bug信息明细成功", bugService.getBugById(id));
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResultBean.failure("获取Bug信息明细失败");
        }
    }

    /**
     * 编辑项目Bug
     * @param request
     * @param tProjectBug
     * @return
     */
    @SystemLog("编辑项目Bug")
    @PostMapping(value = "updateProjectBug")
    public ResultBean updateProjectBug (HttpServletRequest request, TProjectBug tProjectBug) {
        SysUser sysUser = userService.getLoginUser(request);
        try {
            if (bugService.checkUpdateBugName(tProjectBug.getTaskName(),tProjectBug.getId())==false){
                return ResultBean.failure("Bug名称已存在，请重新输入！");
            }
            bugService.updateProjectBug(sysUser, tProjectBug);
            logService.insertLogInfo(sysUser.getLoginName(),"updateProjectBug",tProjectBug.getId(),tProjectBug.getTaskName(),"编辑项目Bug",null,null);
            return ResultBean.success("编辑项目Bug成功！");
        } catch (Exception ex) {
            String errorInfo = "";
            for(StackTraceElement elem : ex.getStackTrace()) {
                errorInfo  += String.valueOf(elem) ;
            }
            logService.insertLogInfo(sysUser.getLoginName(),errorInfo,"SYS_ERR",tProjectBug.getTaskName(),"编辑项目Bug",ex.getCause().toString(),ex.getMessage());
            ex.printStackTrace();
            return ResultBean.failure("编辑项目Bug失败！");
        }
    }

    /**
     *确认/已修正/解决项目Bug
     * @param request
     * @param tProjectBug 项目Bug
     * @param content 备注
     * @param type 类型
     * @return
     */
    @SystemLog("确认/已修正/解决项目Bug")
    @PostMapping(value = "confirmBug")
    public ResultBean confirmBug (HttpServletRequest request, TProjectBug tProjectBug, String content, String type) {
        SysUser sysUser = userService.getLoginUser(request);
        String param = "确认项目Bug";
        if (type != null) {
            if (type.equals("solve")) {
                param = "已修正项目Bug";
            } else if (type.equals("close")) {
                param = "解决项目Bug";
            } else if (type.equals("activation")) {
                param = "激活项目Bug";
                tProjectBug.setStartTime(new Date());
            }
        } else {
            tProjectBug.setStartTime(new Date());
        }
        if (content == null) {
            content = "confirmBug";
        }
        try {
            bugService.updateProjectBug(sysUser, tProjectBug);
            logService.insertLogInfo(sysUser.getLoginName(),content,tProjectBug.getId(),tProjectBug.getTaskName(),param,null,null);
            return ResultBean.success(param + "成功！");
        } catch (Exception ex) {
            String errorInfo = "";
            for(StackTraceElement elem : ex.getStackTrace()) {
                errorInfo  += String.valueOf(elem) ;
            }
            logService.insertLogInfo(sysUser.getLoginName(),errorInfo,"SYS_ERR",tProjectBug.getTaskName(),param,ex.getCause().toString(),ex.getMessage());
            ex.printStackTrace();
            return ResultBean.failure(param + "失败！");
        }
    }

    /**
     * 新增时判断项目Bug名称是否重复
     * @param bugNm Bug名称
     * @param bugNm bug名称
     * @return
     */
    @SystemLog("新增时判断项目Bug名称是否重复")
    @GetMapping(value = "checkInsertBugName")
    public ResultBean checkInsertBugName(String bugNm) {
        try {
            return ResultBean.success("操作成功", bugService.checkInsertBugName(bugNm));
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResultBean.failure("操作失败");
        }
    }

    /**
     * 编辑时判断项目Bug名称是否重复
     * @param bugNm Bug名称
     * @return
     */
    @SystemLog("编辑时判断项目Bug名称是否重复")
    @GetMapping(value = "checkUpdateBugName")
    public ResultBean checkUpdateBugName(String bugNm,String id) {
        try {
            return ResultBean.success("操作成功", bugService.checkUpdateBugName(bugNm,id));
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResultBean.failure("操作失败");
        }
    }
}
