package com.sjasoft.pmis.mybatis.extend.dao;

import com.sjasoft.pmis.mybatis.extend.entity.Bug;
import com.sjasoft.pmis.mybatis.generate.entity.TProjectBug;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

public interface BugDao {

    /**
     * 获取项目下的Bug列表
     * @param proId
     * @return Bug列表
     */
    List<Bug> getBugList(@Param("proId") String proId, @Param("taskName") String taskName, @Param("personName") String personName, @Param("creator") String creator, @Param("createTime") Date createTime, @Param("item") List<String> item);

    /**
     * 根据ID查询Bug明细
     * @param id
     * @return
     */
    Bug getBugById(@Param("id") String id);
}
