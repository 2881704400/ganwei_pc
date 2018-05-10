using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using GWServiceAPI.Net.LibClass;
using GWServiceAPI.Net.Models;
using Newtonsoft.Json.Linq;
using AlarmCenter.DataCenter;
using GWServiceWebAPI.Models;
using cn.jpush.api;
using cn.jpush.api.push.mode;
using System.IO;
using System.Text;
using System.Data;
using System.Text.RegularExpressions;
using GWServiceAPI.Net.Controllers;
using Word = Microsoft.Office.Interop.Word;
using Excel = Microsoft.Office.Interop.Excel;
using PowerPoint = Microsoft.Office.Interop.PowerPoint;
using System.Web;
using AlarmCenterWcfServiceLibrary;

namespace GWServiceWebAPI.Controllers
{
    public class GWServiceWebAPIController : ApiAuthController
    {
        ///-----------------------------------------------------------------------------------------------------------------------------------------------
        /// 实时快照及定时任务接口
        ///-----------------------------------------------------------------------------------------------------------------------------------------------

        /// <summary>
        /// 删除数据 DELETE FROM tableName where tableVlue
        /// </summary>
        /// <param name="jb">
        /// tableName 报表名称
        /// tableVlue 报表数据
        /// </param>
        /// <returns></returns>
        [HttpPost]
        public object set_DeleteTableData(JObject jb)
        {
            DataResult dr = new DataResult();
            //注意：post请求参数为JObject类型
            dynamic json = jb;
            string tableName = json.tableName;
            string tableVlue = json.tableVlue;
            string sql = "DELETE FROM " + tableName + " WHERE " + tableVlue + " ";
            dr = ServerLib.ExecuteSQL(sql);
            WriteLog("删除数据:" + sql);
            return dr;
        }

        /// <summary>
        /// 插入新数据 insert into tableName select tableVlue
        /// </summary>
        /// <param name="jb">
        /// tableName 报表名称
        /// tableVlue 报表数据
        /// </param>
        /// <returns></returns>
        [HttpPost]
        public object set_InsertNewTable(JObject jb)
        {
            DataResult dr = new DataResult();
            //注意：post请求参数为JObject类型
            dynamic json = jb;
            string tableName = json.tableName;
            string tableVlue = json.tableVlue;
            string sql = "INSERT INTO " + tableName + " " + tableVlue + " ";
            dr = ServerLib.ExecuteSQL(sql);
            WriteLog("插入新数据:" + sql);
            return dr;
        }

        /// <summary>
        /// 批量更新数据
        /// </summary>
        /// <param name="jb">
        /// tableName 报表名称
        /// cellDataList 更新数据
        /// ifDataList 检索数据
        /// </param>
        /// <returns></returns>
        [HttpPost]
        public object set_BatchUpdate(JObject jb)
        {
            DataResult dr = new DataResult();
            //注意：post请求参数为JObject类型
            dynamic json = jb;
            string tableName = json.tableName;
            string cellDataList = json.cellDataList;
            string ifDataList = json.ifDataList;
            string sql = "UPDATE " + tableName + " SET " + cellDataList + " WHERE " + ifDataList + "";
            dr = ServerLib.ExecuteSQL(sql);
            WriteLog("批量更新数据:" + sql);
            return dr;
        }

        /// <summary>
        /// 获取循环任务
        /// </summary>
        /// <param name="jb">
        /// TableID 报表编码
        /// </param>
        /// <returns></returns>
        [HttpPost]
        public object get_LoopCycleList(JObject jb)
        {
            DataResult dr = new DataResult();
            dynamic json = jb;
            string TableID = json.TableID;
            string sql = "select a.*,b.set_nm from GWProcCycleTable a left join SetParm b on a.equip_no=b.equip_no and a.set_no=b.set_no where a.TableID=" + TableID;
            dr = ServerLib.GetDataTableSQL(sql);
            WriteLog("获取循环任务:" + sql);
            return dr;
        }

        /// <summary>
        /// 获取普通任务:设备控制
        /// </summary>
        /// <param name="jb">
        /// TableID 报表编码
        /// </param>
        /// <returns></returns>
        [HttpPost]
        public object get_CommonTaskEquipControl(JObject jb)
        {
            DataResult dr = new DataResult();
            dynamic json = jb;
            string TableID = json.TableID;
            string sql = "select a.*,b.sta_n,b.set_nm from GWProcTimeEqpTable a,SetParm b where a.equip_no=b.equip_no and a.set_no=b.set_no and a.TableID=" + TableID;
            dr = ServerLib.GetDataTableSQL(sql);//内置接口，执行查询SQL
            return dr;
        }

        /// <summary>
        /// 根据表名、ID查询数据
        /// </summary>
        /// <param name="jb">
        /// TableName 报表名称
        /// TableID 报表编码
        /// </param>
        /// <returns></returns>
        [HttpPost]
        public object get_DataByTableNameAndID(JObject jb)
        {
            DataResult dr = new DataResult();
            dynamic json = jb;
            string TableName = json.TableName;
            string TableID = json.TableID;
            string sql = "select *  from " + TableName + " where TableID=" + TableID;
            dr = ServerLib.GetDataTableSQL(sql);//内置接口，执行查询SQL
            return dr;
        }

        /// <summary>
        /// 根据表名查询数据
        /// </summary>
        /// <param name="jb">
        /// TableName 报表名称
        /// </param>
        /// <returns></returns>
        [HttpPost]
        public object get_DataByTableName(JObject jb)
        {
            DataResult dr = new DataResult();
            dynamic json = jb;
            string TableName = json.TableName;
            string sql = "select *  from " + TableName;
            dr = ServerLib.GetDataTableSQL(sql);//内置接口，执行查询SQL
            return dr;
        }

        /// <summary>
        /// 获取事件的报警配置
        /// </summary>
        /// <param name="jb">
        /// </param>
        /// <returns></returns>
        [HttpPost]
        public object get_AlarmConfig(JObject jb)
        {
            DataResult dr = new DataResult();
            dynamic json = jb;
            dr = GWServiceAPI.Net.LibClass.EventLib.GetAlarmConfig();
            return dr;
        }

        /// <summary>
        /// 获取当前系统报警的实时事件
        /// </summary>
        /// <param name="jb">
        /// event_Level_list 报警分类，多个值请用逗号隔开
        /// </param>
        /// <returns></returns>
        [HttpPost]
        public object get_RealTimeEvent(JObject jb)
        {
            DataResult dr = new DataResult();
            dynamic json = jb;
            string levels = json.event_Level_list;
            string auth = Request.Headers.Authorization.Scheme;
            dr = GWServiceAPI.Net.LibClass.EventLib.GetRealTimeEvent(levels, auth);
            return dr;
        }

        /// <summary>
        /// 获取当前实时报警事件的总数
        /// </summary>
        /// <param name="jb">
        /// levels 报警分类，多个分类请用';'符号隔开，多个值请用逗号隔开
        /// </param>
        /// <returns></returns>
        [HttpPost]
        public object get_RealTimeEventCount(JObject obj)
        {
            DataResult dr = new DataResult();
            dynamic json = obj;
            string levels = json.levels;
            if (string.IsNullOrEmpty(levels))
                return GWServiceAPI.Net.LibClass.ApiCode.Code1003(dr);
            string auth = Request.Headers.Authorization.Scheme;
            dr = GWServiceAPI.Net.LibClass.EventLib.GetRealTimeEventCount(levels.ToString(), auth);
            return dr;
        }

        /// <summary>
        /// 确认当前报警事件
        /// </summary>
        /// <param name="jb">
        ///  msg:处理意见
        ///  shortmsg:是否发送短信
        ///  tel:发送人的电话
        ///  evtname:事件名
        ///  time:事件时间
        /// </param>
        /// <returns></returns>
        [HttpPost]
        public object set_EventConfirm(JObject obj)
        {
            DataResult dr = new DataResult();
            dynamic json = obj;
            string msg = json.msg;
            string shortmsg = json.shortmsg;
            string tel = json.tel;
            string evtname = json.evtname;
            string time = json.time;
            if (string.IsNullOrEmpty(evtname) || string.IsNullOrEmpty(time))
                return GWServiceAPI.Net.LibClass.ApiCode.Code1003(dr);
            dr = GWServiceAPI.Net.LibClass.EventLib.EventConfirm(msg.ToString(), shortmsg.ToString(), tel.ToString(), evtname.ToString(), time.ToString());
            return dr;
        }

        /// <summary>
        /// 查询设备事件
        /// </summary>
        /// <param name="jb">
        ///  times:时间，起始时间,结束时间;(当只有一个时间的时候，为起始时间)
        ///  equip_no_list:设备号，多个数据时请用“,”号隔开
        /// </param>
        /// <returns></returns>
        [HttpPost]
        public object get_EquipEventHistory(JObject obj)
        {
            DataResult dr = new DataResult();
            dynamic json = obj;
            string times = json.times;
            string equip_nos = json.equip_nos;
            if (string.IsNullOrEmpty(times) || string.IsNullOrEmpty(equip_nos))
                return GWServiceAPI.Net.LibClass.ApiCode.Code1003(dr);
            string auth = Request.Headers.Authorization.Scheme;
            dr = GWServiceAPI.Net.LibClass.EventLib.EventQueryHistory("YcYxEvt", times.ToString(), equip_nos.ToString(), auth);
            return dr;
        }

        /// <summary>
        /// 查询设置事件
        /// </summary>
        /// <param name="jb">
        ///  times:时间，起始时间,结束时间;(当只有一个时间的时候，为起始时间)
        ///  equip_no_list:设备号，多个数据时请用“,”号隔开
        /// </param>
        /// <returns></returns>
        [HttpPost]
        public object get_SetEventHistory(JObject obj)
        {
            DataResult dr = new DataResult();
            dynamic json = obj;
            string times = json.times;
            string equip_nos = json.equip_nos;
            if (string.IsNullOrEmpty(times) || string.IsNullOrEmpty(equip_nos))
                return GWServiceAPI.Net.LibClass.ApiCode.Code1003(dr);
            string auth = Request.Headers.Authorization.Scheme;
            dr = GWServiceAPI.Net.LibClass.EventLib.EventQueryHistory("SetEvt", times.ToString(), equip_nos.ToString(), auth);
            return dr;
        }

        /// <summary>
        /// 查询系统事件(仅支持管理员)
        /// </summary>
        /// <param name="jb">
        /// times 时间，起始时间,结束时间;(当只有一个时间的时候，为起始时间)
        /// </param>
        /// <returns></returns>
        [HttpPost]
        public object get_SystemEventHistory(JObject obj)
        {
            DataResult dr = new DataResult();
            dynamic json = obj;
            string times = json.times;
            if (string.IsNullOrEmpty(times))
                return GWServiceAPI.Net.LibClass.ApiCode.Code1003(dr);
            string auth = Request.Headers.Authorization.Scheme;
            dr = GWServiceAPI.Net.LibClass.EventLib.EventQueryHistory("SysEvt", times.ToString(), "", auth);
            return dr;
        }

        ///-----------------------------------------------------------------------------------------------------------------------------------------------
        /// 设备数据及设备联动接口
        ///-----------------------------------------------------------------------------------------------------------------------------------------------

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
            string sql = "insert into AutoProc (iequip_no, iycyx_no, iycyx_type, delay, oequip_no, oset_no, ProcDesc) values(" + reqData.equipNo + "," + reqData.cNo + ",'" + reqData.cType + "'," + reqData.delay + "," + reqData.linkEquipNo + "," + reqData.linkNo + ",'" + reqData.remarks + "')";
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

        /// 获取yxp表数据
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



        ///-----------------------------------------------------------------------------------------------------------------------------------------------
        /// 首页及报警排表接口
        ///-----------------------------------------------------------------------------------------------------------------------------------------------

        /// <summary>
        /// 查询设备配置表
        /// </summary>
        /// <param name="tableName">表名</param>
        [HttpGet]
        public object SelectData(string TableName)
        {
            DataResult dr = new DataResult();
            string sql = "select *  from " + TableName;
            dr = ServerLib.GetDataTableSQL(sql);//内置接口，执行查询SQL
            return dr;
        }


        /// <summary>
        /// 更新数据
        /// </summary>
        /// <param name="obj">
        /// </param>
        [HttpPost]
        public object updateEquipGroup(JObject obj)
        {
            DataResult dr = new DataResult();
            //注意：post请求参数为JObject类型
            dynamic json = obj;


            string sql = "";
            string isJudge = json.tableName;

            switch (isJudge)
            {
                case "Administrator":
                    sql = "UPDATE Administrator SET Administrator = '" + json.Administrator + "',Telphone = '" + json.Telphone + "',MobileTel = '" + json.MobileTel + "',EMail = '" + json.EMail + "',AckLevel = " + json.AckLevel + " WHERE " + json.ifName + "='" + json.ifValue + "'";
                    break;
                case "WeekAlmReport":
                    sql = "UPDATE WeekAlmReport SET Administrator = '" + json.Administrator + "',week_day = " + json.week_day + ",begin_time = '" + json.begin_time + "',end_time = '" + json.end_time + "' WHERE id=" + json.ifValue;
                    break;
                case "SpeAlmReport":
                    sql = "UPDATE SpeAlmReport SET Administrator = '" + json.Administrator + "',begin_time = '" + json.begin_time + "',end_time = '" + json.end_time + "' WHERE id=" + json.ifValue;
                    break;
                case "AlmReport":
                    sql = "UPDATE AlmReport SET Administrator = '" + json.Administrator + "',group_no = " + json.group_no + " WHERE id =" + json.ifValue;
                    break;
                case "EquipGroup":
                    sql = "UPDATE EquipGroup SET group_name = '" + json.group_name + "',equipcomb = '" + json.equipcomb + "' WHERE group_no = " + json.ifValue;
                    break;
                case "1":
                    sql = "UPDATE EquipGroup1 SET equipcomb = '" + json.equipcomb + "' WHERE group_no = " + json.ifValue;
                    break;
                default:

                    break;
            }

            dr = ServerLib.ExecuteSQL(sql);
            return sql;
        }

        /// <summary>
        /// 清空字段
        /// </summary>
        /// <param name="obj">
        /// </param>
        [HttpPost]
        public object nullTableCell(JObject obj)
        {
            DataResult dr = new DataResult();
            //注意：post请求参数为JObject类型
            dynamic json = obj;
            string sql = "";
            string isJudge = json.tableName;

            switch (isJudge)
            {
                case "WeekAlmReport":
                    sql = "UPDATE WeekAlmReport SET Administrator = '' WHERE Administrator = '" + json.Administrator + "'";
                    break;
                case "SpeAlmReport":
                    sql = "UPDATE SpeAlmReport SET Administrator = '' WHERE Administrator = '" + json.Administrator + "'";
                    break;
                case "AlmReport":
                    sql = "UPDATE AlmReport SET Administrator = '' WHERE Administrator = '" + json.Administrator + "'";
                    break;
                default:
                    sql = "UPDATE AlmReport SET group_no = '' WHERE group_no = " + json.group_no;
                    break;
            }
            dr = ServerLib.ExecuteSQL(sql);
            return sql;
        }

        /// <summary>
        /// 插入数据
        /// </summary>
        /// <param name="obj">
        /// </param>
        [HttpPost]
        public object insertEquipGroup(JObject obj)
        {
            DataResult dr = new DataResult();
            //注意：post请求参数为JObject类型
            dynamic json = obj;
            string sql = "";
            string isJudge = json.tableName;

            switch (isJudge)
            {
                case "Administrator":
                    sql = "INSERT INTO Administrator (Administrator,Telphone,MobileTel,EMail,AckLevel,Reserve1,Reserve2,Reserve3) VALUES ('" + json.Administrator + "','" + json.Telphone + "','" + json.MobileTel + "','" + json.EMail + "'," + json.AckLevel + ",'0','0','0')";
                    break;
                case "EquipGroup":
                    sql = "INSERT INTO EquipGroup (sta_n,group_no,group_name,equipcomb) VALUES (0," + json.groupNo + ",'" + json.groupName + "','')";
                    break;
                case "AlmReport":
                    sql = "INSERT INTO AlmReport (sta_n,group_no,Administrator) VALUES (0," + json.group_no + ",'" + json.Administrator + "')";
                    break;
                case "WeekAlmReport":
                    sql = "INSERT INTO WeekAlmReport (sta_n,group_no,Administrator,week_day,begin_time,end_time,remark) VALUES (0,0,'" + json.Administrator + "'," + json.week_day + ",'" + json.begin_time + "','" + json.end_time + "','0')";
                    break;
                case "SpeAlmReport":
                    sql = "INSERT INTO SpeAlmReport (sta_n,group_no,Administrator,begin_time,end_time,remark) VALUES (0,0,'" + json.Administrator + "','" + json.begin_time + "','" + json.end_time + "','0')";
                    break;
                default: break;
            }


            dr = ServerLib.ExecuteSQL(sql);
            return sql;
        }


        /// <summary>
        /// 删除数据
        /// </summary>
        /// <param name="obj">
        /// </param>
        [HttpPost]
        public object deleteEquipGroup(JObject obj)
        {
            DataResult dr = new DataResult();
            //注意：post请求参数为JObject类型
            dynamic json = obj;


            string sql = "";
            string isJudge = json.type;

            switch (isJudge)
            {
                case "number":
                    sql = "DELETE FROM " + json.tableName + " WHERE " + json.ifName + " = " + json.ifValue;
                    break;
                case "string":
                    sql = "DELETE FROM " + json.tableName + " WHERE " + json.ifName + " = '" + json.ifValue + "'";
                    break;
                default: break;
            }

            dr = ServerLib.ExecuteSQL(sql);
            return dr;
        }

        /// <summary>
        /// 写入日志，默认c盘
        /// </summary>
        /// <param name="strLog"></param>
        public static void WriteLog(string strLog)
        {
            string sFilePath = "c:\\" + DateTime.Now.ToString("yyyyMM");
            string sFileName = "WebXLog" + DateTime.Now.ToString("dd") + ".log";
            sFileName = sFilePath + "\\" + sFileName; //文件的绝对路径
            if (!Directory.Exists(sFilePath))//验证路径是否存在
            {
                Directory.CreateDirectory(sFilePath);
                //不存在则创建
            }
            FileStream fs;
            StreamWriter sw;
            if (File.Exists(sFileName))
            //验证文件是否存在，有则追加，无则创建
            {
                fs = new FileStream(sFileName, FileMode.Append, FileAccess.Write, FileShare.ReadWrite);
            }
            else
            {
                fs = new FileStream(sFileName, FileMode.Create, FileAccess.Write);
            }
            sw = new StreamWriter(fs);
            sw.WriteLine(DateTime.Now.ToString("yyyy-MM-dd HH-mm-ss") + "   ---   " + strLog);
            sw.Close();
            fs.Close();
        }
    }
}