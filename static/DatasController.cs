using GWServiceAPI.Net.Controllers;
using GWServiceAPI.Net.LibClass;
using GWServiceAPI.Net.Models;
using AlarmCenter.DataCenter;
using Microsoft.CSharp;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.CodeDom.Compiler;
using System.Web.Http;

namespace GWService.Api.Test.Controllers
{
    /// <summary>
    /// 自定义数据库接口，控制器名为Db,请求时不区分大小写
    /// </summary>
    public class DatasController : ApiAuthController
    {
        /// <summary>
        /// 获取设备联动配置列表
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        [HttpPost]
        public object getLinkageList(JObject req)
        {
            DataResult res = new DataResult();
            dynamic reqData = req;
            string sql = "select * from AutoProc";
            res = ServerLib.GetDataTableSQL(sql);
            return res;
        }

        /// <summary>
        /// 新增联动设置
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        [HttpPost]
        public object addLinkage(JObject req)
        {
            DataResult res = new DataResult();
            dynamic reqData = req;
            string sql = "insert into AutoProc (iequip_no, iycyx_no, iycyx_type, delay, oequip_no, oset_no, ProcDesc) values(" + reqData.equipNo + "," + reqData.cNo + ",'" + reqData.cType + "',"+reqData.delay+ ","+reqData.linkEquipNo+","+reqData.linkNo+",'"+reqData.remarks+"')";
            res = ServerLib.ExecuteSQL(sql);
            return res;
        }

        /// <summary>
        /// 删除联动设置
        /// </summary>
        /// <param name="req">req.id:ID</param>
        /// <returns></returns>
        [HttpPost]
        public object deleteLinkage(JObject req)
        {
            DataResult res = new DataResult();
            dynamic reqData = req;
            string sql = "delete from AutoProc where ID=" + reqData.id;
            res = ServerLib.ExecuteSQL(sql);
            return res;
        }

        /// <summary>
        /// 修改联动设置
        /// </summary>
        /// <param name="req">req.id:ID</param>
        /// <returns></returns>
        [HttpPost]
        public object updateLinkage(JObject req)
        {
            DataResult res = new DataResult();
            dynamic reqData = req;
            string sql = "update AutoProc set iequip_no=" + reqData.equipNo + ",iycyx_no=" + reqData.cNo + ",iycyx_type='" + reqData.cType + "',delay=" + reqData.delay + ",oequip_no=" + reqData.linkEquipNo + ",oset_no=" + reqData.linkNo + ",ProcDesc='" + reqData.remarks + "' where ID=" + reqData.id;
            res = ServerLib.ExecuteSQL(sql);
            return res;
        }

        /// <summary>
        /// 新增场景
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        [HttpPost]
        public object addScene(JObject req)
        {
            DataResult res = new DataResult();
            dynamic reqData = req;
            string sql = "insert into SetParm (equip_no, set_no, main_instruction, set_nm, set_type) values(300, " + reqData.setNo + ", 'ChangJing', '" + reqData.title + "', 'J')";
            res = ServerLib.ExecuteSQL(sql);
            return res;
        }

        /// <summary>
        /// 删除场景
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        [HttpPost]
        public object deleteScene(JObject req)
        {
            DataResult res = new DataResult();
            dynamic reqData = req;
            string sql = "delete from SetParm where equip_no=300 and set_no=" + reqData.setNo;
            res = ServerLib.ExecuteSQL(sql);
            return res;
        }


        /// <summary>
        /// 修改场景设置
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        [HttpPost]
        public object updateScene(JObject req)
        {
            DataResult res = new DataResult();
            dynamic reqData = req;
            string sql = "update SetParm set [value]='" + reqData.dataStr + "', [set_nm]='" + reqData.sceneName + "' where equip_no=" + reqData.equipNo + " and set_no=" + reqData.setNo;
            res = ServerLib.ExecuteSQL(sql);
            return res;
        }

        /// <summary>
        /// 获取ycp表数据
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        [HttpPost]
        public object getYcpList(JObject req)
        {
            DataResult res = new DataResult();
            dynamic reqData = req;
            string sql = "select * from ycp";
            res = ServerLib.GetDataTableSQL(sql);
            return res;
        }

        /// <summary>
        /// 获取ycp表数据
        /// </summary>
        /// <param name="req">req.equip_nos:设备号</param>
        /// <returns></returns>
        [HttpPost]
        public object getYcp(JObject req)
        {
            DataResult res = new DataResult();
            dynamic reqData = req;
            string sql = "select * from ycp where equip_no=" + reqData.equip_nos;
            res = ServerLib.GetDataTableSQL(sql);
            return res;
        }

        /// <summary>
        /// 获取ycp表数据
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        [HttpPost]
        public object getYxpList(JObject req)
        {
            DataResult res = new DataResult();
            dynamic reqData = req;
            string sql = "select * from yxp";
            res = ServerLib.GetDataTableSQL(sql);
            return res;
        }

        /// 获取ycp表数据
        /// </summary>
        /// <param name="req">req.equip_nos:设备号</param>
        /// <returns></returns>
        [HttpPost]
        public object getYxp(JObject req)
        {
            DataResult res = new DataResult();
            dynamic reqData = req;
            string sql = "select * from yxp where equip_no=" + reqData.equip_nos;
            res = ServerLib.GetDataTableSQL(sql);
            return res;
        }

        /// <summary>
        /// 获取setParm数据
        /// </summary>
        [HttpPost]
        public object getSetparmList(JObject req)
        {
            DataResult res = new DataResult();
            dynamic reqData = req;
            string sql;
            if (reqData.findEquip == true)
            {
                sql = "select * from SetParm where equip_no=" + reqData.equipNo;
            }
            else
            {
                sql = "select * from SetParm";
            }
            res = ServerLib.GetDataTableSQL(sql);
            return res;
        }

        /// <summary>
        /// 获取Equip所有设备数据
        /// </summary>
        [HttpPost]
        public object getEquipList(JObject req)
        {
            DataResult res = new DataResult();
            dynamic reqData = req;
            string sql = "select * from Equip";
            res = ServerLib.GetDataTableSQL(sql);
            return res;
        }
    }
}
