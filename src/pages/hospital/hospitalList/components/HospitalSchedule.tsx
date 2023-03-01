import React, { useEffect, useState } from 'react'
import { Card, Tag, Tree, Row, Col, Pagination, Table, Button, message } from 'antd'
import { DepartmentList, BookingRulesList, ScheduleList } from '@/api/hospital/model/hospitalListModule'
import { reqDepartment, reqScheduleRules, reqScheduleRulesTable } from '@/api/hospital/hospitalList'
import { useParams } from 'react-router-dom';


let depcode: string
export default function HospitalSchedule() {
  const [departmentData, setDepartmentData] = useState<DepartmentList>([])
  const [keyCode, setKeyCode] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [total, setTotal] = useState(5)

  // 排班数据
  const [scheduleInfo, setScheduleInfo] = useState<BookingRulesList>([])
  // 排班表格数据
  const [scheduleListData, setScheduleListData] = useState<ScheduleList>([])


  // 动态渲染nav
  const [hosname, setHosname] = useState('')
  const [depname, setDepname] = useState('')
  const [workDate, setWorkDate] = useState('')


  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const result = await getDepartment()
    // 提示对象可能为空 用三元运算符描述
    depcode = result[0].children ? result[0].children[0].depcode : ''
    const depname = result[0].children ? result[0].children[0].depname : ''
    setDepname(depname)

    const bookingRule = await getSchedule(page, pageSize, depcode)
    const workDate = bookingRule[0].workDate
    setWorkDate(workDate)
    // 获取排班信息
    getScheduleTable(workDate)
  }

  const { hoscode } = useParams()

  // 获取科室
  async function getDepartment() {
    const result = await reqDepartment(hoscode as string)
    result.forEach((item) => {
      item.disabled = true
    })
    setDepartmentData(result)

    // console.log('科室数据', result);
    // 获取要展开的节点数组
    setKeyCode(result.map((item) => item.depcode))
    return result
  }
  // 单点击树状解构
  const onSelect = async (selectedKeys: any, info: any) => {
    // console.log('selected', selectedKeys, info);
    try {
      // 修改科室名
      setDepname(info.node.depname)
      depcode = selectedKeys[0]
      const bookingScheduleList = await getSchedule(page, pageSize, depcode)
      const workDate = bookingScheduleList[0].workDate
      setWorkDate(workDate)
      // 重新获取表格数据
      getScheduleTable(workDate)
    } catch (error) {
      message.error('暂无数据')
      //清除Tag
      setScheduleInfo([])
      // 清除表格数据
      setScheduleListData([])
      // 
      setWorkDate('')
    }
  };
  // 排版规则
  async function getSchedule(page: number, pageSize: number, depcode: string) {
    const scheduleData = await reqScheduleRules({
      page, limit: pageSize, hoscode: hoscode as string, depcode
    })
    // console.log('结果', scheduleData);
    setTotal(scheduleData?.total)
    setScheduleInfo(scheduleData.bookingScheduleList)
    setHosname(scheduleData?.baseMap.hosname)
    return scheduleData.bookingScheduleList
  }

  // 请求表格详情数据
  async function getScheduleTable(workDate: string) {
    const result = await reqScheduleRulesTable({ hoscode: hoscode as string, depcode, workDate })
    // console.log('表格数据', result);
    setScheduleListData(result)
  }

  // tree列表高度
  let listHeight = document.body.clientHeight - 64 - 34 - 24 * 2 - 14 - 22

  const columns = [
    {
      title: '序号',
      render: (text: any, recode: any, index: number) => {
        return index + 1
      },
    },
    {
      title: '职称',
      dataIndex: 'title'
    },
    {
      title: '号源时间',
      dataIndex: 'workDate'
    },
    {
      title: '可预约数',
      dataIndex: 'availableNumber'
    },
    {
      title: '剩余预约数',
      dataIndex: 'reservedNumber'
    },
    {
      title: '挂号费（元）',
      dataIndex: 'amount'
    },
    {
      title: '擅长技能',
      dataIndex: 'skill'
    },
  ];


  return (
    <Card>
      <p>{`选择：${hosname} / ${depname} / ${workDate}`}</p>
      <Row gutter={20}>
        <Col span={5}>
          <div style={{
            border: '1px solid black',
            overflow: 'auto',
            height: listHeight
          }}>
            <Tree
              fieldNames={{
                key: 'depcode',
                title: 'depname',
              }}
              // 默认展开的节点
              expandedKeys={keyCode}
              onSelect={onSelect}
              treeData={departmentData as any}
            />
          </div>
        </Col>
        <Col span={19}>
          {
            scheduleInfo.map((item, index) => {
              return (
                <Tag onClick={() => {
                  // console.log('status', item);
                  setWorkDate(item.workDate)
                  getScheduleTable(item.workDate)

                }}
                  style={{ marginBottom: 10 }}
                  color={workDate === item.workDate ? '#f50' : ''} key={index}>
                  <div>{item.workDate} {item.dayOfWeek}</div>
                  <div>{item.docCount} / {item.reservedNumber}</div>
                </Tag>
              )

            })
          }

          <Pagination
            style={{ marginBottom: 20, marginTop: 20 }}
            pageSize={pageSize}
            current={page}
            total={total}
            showSizeChanger
            pageSizeOptions={[2, 5, 10]}
            onChange={async (page, pageSize) => {
              setPage(page)
              setPageSize(pageSize)
              // 重新获取
              const bookingRules = await getSchedule(page, pageSize, depcode)
              setWorkDate(bookingRules[0].workDate)
              //获取最新表格数据
              getScheduleTable(workDate)
              // fetchData()
            }}></Pagination>
          <Table pagination={false} columns={columns} dataSource={scheduleListData} rowKey={'id'}></Table>
          <Button>返回</Button>
        </Col>
      </Row>

    </Card >
  )
}
