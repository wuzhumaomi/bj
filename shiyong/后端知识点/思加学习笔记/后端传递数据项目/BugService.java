package com.sjasoft.pmis.service;

import com.github.pagehelper.PageHelper;
import com.sjasoft.framework.annotation.SystemLog;
import com.sjasoft.framework.service.AbstractService;
import com.sjasoft.pmis.mybatis.extend.dao.BugDao;
import com.sjasoft.pmis.mybatis.extend.entity.Bug;
import com.sjasoft.pmis.mybatis.generate.dao.TProjectBugDao;
import com.sjasoft.pmis.mybatis.generate.entity.SysUser;
import com.sjasoft.pmis.mybatis.generate.entity.TProject;
import com.sjasoft.pmis.mybatis.generate.entity.TProjectBug;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by hj on 2019/6/12.
 * 项目BugService
 */
@Service
public class BugService extends AbstractService<TProjectBug> {
    @Resource
    private BugDao bugDao;

    @Resource
    private BugService bugService;

    @Resource
    private TProjectBugDao tProjectBugDao;

    /**
     * 添加项目Bug
     * @param sysUser
     * @param tProjectBug
     */
    @SystemLog("添加项目Bug")
    public TProjectBug insertProjectBug(SysUser sysUser, TProjectBug tProjectBug){
        tProjectBug.setActivaNumber(0);
        tProjectBug.setBugStatus("0");
        tProjectBug.setIsEnabled("1");
        tProjectBug.setCreator(sysUser.getLoginName());
        tProjectBug.setUpdater(sysUser.getLoginName());
        tProjectBug.setCreateTime(new Date());
        tProjectBug.setUpdateTime(new Date());
        tProjectBugDao.insertSelective(tProjectBug);
        return tProjectBug;
    }

    /**
     * 获取项目下的Bug列表
     * @param page 当前页数
     * @param limit 分页数
     * @param proId 项目ID
     * @return 需求列表
     */
    //String bugStatus,
    public List<Bug> getBugList(Integer page, Integer limit, String proId, String taskName, String personName, String creator, Date createTime, String item){
        PageHelper.startPage(page, limit);
        List<String> list=new ArrayList<>();
        for (int i=0;i<item.split(",").length;i++){
            list.add(item.split(",")[i]);
        }
        return bugDao.getBugList(proId,taskName,personName,creator,createTime,list);
    }

    /**
     * 根据ID查询Bug明细
     * @param id
     * @return
     */
    public Bug getBugById(String id) {
        return bugDao.getBugById(id);
    }

    /**
     * 编辑项目Bug
     * @param sysUser
     * @param tProjectBug
     */
    @SystemLog("编辑项目Bug")
    public void updateProjectBug(SysUser sysUser, TProjectBug tProjectBug){
        tProjectBug.setUpdater(sysUser.getLoginName());
        tProjectBug.setUpdateTime(new Date());
        tProjectBugDao.updateByPrimaryKeySelective(tProjectBug);
    }

    /**
     * 新增时判断项目Bug名称是否重复
     * @param bugNm bug名称
     * @return
     */
    @SystemLog("新增时判断项目Bug名称是否重复")
    public  boolean checkInsertBugName(String bugNm){
        Example.Criteria criteria = bugService.createCriteria();
        criteria.andEqualTo("taskName",bugNm);
        criteria.andNotEqualTo("isEnabled",'0');
        List<TProjectBug> tProjectBug = bugService.selectByCondition(criteria);
        if(tProjectBug.size() > 0){
            return false;
        } else {
            return true;
        }
    }

    /**
     * 编辑时判断项目Bug名称是否重复
     * @param bugNm bug名称
     * @param id bugid
     * @return
     */
    @SystemLog("编辑时判断项目Bug名称是否重复")
    public  boolean checkUpdateBugName(String bugNm,String id){
        Example.Criteria criteria = bugService.createCriteria();
        criteria.andEqualTo("taskName",bugNm);
        criteria.andNotEqualTo("id",id);
        criteria.andNotEqualTo("isEnabled",'0');
        List<TProjectBug> tProjectBug = bugService.selectByCondition(criteria);
        if(tProjectBug.size() > 0){
            return false;
        } else {
            return true;
        }
    }
}
