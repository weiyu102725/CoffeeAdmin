package com.gdyx.apidoc.dao;

import com.gdyx.apidoc.model.ApiResponse;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * Created by mac on 2017/12/2.
 */
@Mapper
public interface ApiResponseDao {
    void save(ApiResponse o);

    void saveOrUpdate(ApiResponse o);

    void update(ApiResponse o);

    void delete(String id);

    ApiResponse findApiResponseById(String id);

    int count(Map<String, Object> map);

    List<ApiResponse> findApiResponses(Map<String, Object> map);

    List<ApiResponse> findApiResponseslinkApi(Map<String, Object> map);
}
