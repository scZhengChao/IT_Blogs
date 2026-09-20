# 案例

```xml 
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.zc.stock.mapper.StockMarketIndexInfoMapper">

    <resultMap id="BaseResultMap" type="com.zc.stock.pojo.entity.StockMarketIndexInfo">
            <id property="id" column="id" />
            <result property="marketCode" column="market_code" />
            <result property="marketName" column="market_name" />
            <result property="preClosePoint" column="pre_close_point" />
            <result property="openPoint" column="open_point" />
            <result property="curPoint" column="cur_point" />
            <result property="minPoint" column="min_point" />
            <result property="maxPoint" column="max_point" />
            <result property="tradeAmount" column="trade_amount" />
            <result property="tradeVolume" column="trade_volume" />
            <result property="curTime" column="cur_time" />
    </resultMap>

    <sql id="Base_Column_List">
        id,market_code,market_name,pre_close_point,open_point,cur_point,
        min_point,max_point,trade_amount,trade_volume,cur_time
    </sql>

    <select id="selectByPrimaryKey" parameterType="java.lang.Long" resultMap="BaseResultMap">
        select
        <include refid="Base_Column_List" />
        from stock_market_index_info
        where  id = #{id} 
    </select>
    <select id="getMarketInfo" resultType="com.zc.stock.pojo.domian.InnerMarketDomain">
        select
        smi.market_code as code,
        smi.market_name as name,
        smi.open_point as openPoint,
        smi.cur_point as curPoint,
        smi.pre_close_point as preClosePrice,
        smi.trade_amount as tradeAmt,
        smi.trade_volume as tradeVol,
        smi.cur_point-smi.pre_close_point as upDown,
        (smi.cur_point-smi.pre_close_point)/smi.pre_close_point as rose,
        (smi.max_point-smi.min_point)/smi.pre_close_point as amplitude,
        smi.cur_time as curTime
        from stock_market_index_info as smi
        where smi.market_code in
        <foreach collection="mCodes " item="marketId" open="(" separator="," close=") ">
            #{marketId}
        </foreach>
        and smi.cur_time=#{date }
    </select>

    <delete id="deleteByPrimaryKey" parameterType="java.lang.Long">
        delete from stock_market_index_info
        where  id = #{id} 
    </delete>
    <insert id="insert" keyColumn="id" keyProperty="id" parameterType="com.zc.stock.pojo.entity.StockMarketIndexInfo" useGeneratedKeys="true">
        insert into stock_market_index_info
        ( id,market_code,market_name,pre_close_point,open_point,cur_point,
        min_point,max_point,trade_amount,trade_volume,cur_time)
        values (#{id},#{marketCode},#{marketName},#{preClosePoint},#{openPoint},#{curPoint},
        #{minPoint},#{maxPoint},#{tradeAmount},#{tradeVolume},#{curTime})
    </insert>
    <insert id="insertSelective" keyColumn="id" keyProperty="id" parameterType="com.zc.stock.pojo.entity.StockMarketIndexInfo" useGeneratedKeys="true">
        insert into stock_market_index_info
        <trim prefix="(" suffix=")" suffixOverrides=",">
                <if test="id != null">id,</if>
                <if test="marketCode != null">market_code,</if>
                <if test="marketName != null">market_name,</if>
                <if test="preClosePoint != null">pre_close_point,</if>
                <if test="openPoint != null">open_point,</if>
                <if test="curPoint != null">cur_point,</if>
                <if test="minPoint != null">min_point,</if>
                <if test="maxPoint != null">max_point,</if>
                <if test="tradeAmount != null">trade_amount,</if>
                <if test="tradeVolume != null">trade_volume,</if>
                <if test="curTime != null">cur_time,</if>
        </trim>
        <trim prefix="values (" suffix=")" suffixOverrides=",">
                <if test="id != null">#{id},</if>
                <if test="marketCode != null">#{marketCode},</if>
                <if test="marketName != null">#{marketName},</if>
                <if test="preClosePoint != null">#{preClosePoint},</if>
                <if test="openPoint != null">#{openPoint},</if>
                <if test="curPoint != null">#{curPoint},</if>
                <if test="minPoint != null">#{minPoint},</if>
                <if test="maxPoint != null">#{maxPoint},</if>
                <if test="tradeAmount != null">#{tradeAmount},</if>
                <if test="tradeVolume != null">#{tradeVolume},</if>
                <if test="curTime != null">#{curTime},</if>
        </trim>
    </insert>
    <update id="updateByPrimaryKeySelective" parameterType="com.zc.stock.pojo.entity.StockMarketIndexInfo">
        update stock_market_index_info
        <set>
                <if test="marketCode != null">
                    market_code = #{marketCode},
                </if>
                <if test="marketName != null">
                    market_name = #{marketName},
                </if>
                <if test="preClosePoint != null">
                    pre_close_point = #{preClosePoint},
                </if>
                <if test="openPoint != null">
                    open_point = #{openPoint},
                </if>
                <if test="curPoint != null">
                    cur_point = #{curPoint},
                </if>
                <if test="minPoint != null">
                    min_point = #{minPoint},
                </if>
                <if test="maxPoint != null">
                    max_point = #{maxPoint},
                </if>
                <if test="tradeAmount != null">
                    trade_amount = #{tradeAmount},
                </if>
                <if test="tradeVolume != null">
                    trade_volume = #{tradeVolume},
                </if>
                <if test="curTime != null">
                    cur_time = #{curTime},
                </if>
        </set>
        where   id = #{id} 
    </update>
    <update id="updateByPrimaryKey" parameterType="com.zc.stock.pojo.entity.StockMarketIndexInfo">
        update stock_market_index_info
        set 
            market_code =  #{marketCode},
            market_name =  #{marketName},
            pre_close_point =  #{preClosePoint},
            open_point =  #{openPoint},
            cur_point =  #{curPoint},
            min_point =  #{minPoint},
            max_point =  #{maxPoint},
            trade_amount =  #{tradeAmount},
            trade_volume =  #{tradeVolume},
            cur_time =  #{curTime}
        where   id = #{id} 
    </update>
</mapper>

```
