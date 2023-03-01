import { request } from "@/utils/http";
import {
  HospitalListResponse,
  IHospitalItemParams,
  ProvinceList,
  CityListType,
  IHospitalShow,
  DepartmentList,
  scheduleInfo,
  ResponseInfo,
  ScheduleTable,
  ScheduleList
} from './model/hospitalListModule'

export const reqGetHospitalList = ({ page, pageSize, provinceCode, cityCode, districtCode, hosname, hoscode, hostype, status }: IHospitalItemParams) => {
  return request.get<any, HospitalListResponse>(`/admin/hosp/hospital/${page}/${pageSize}`, {
    params: {
      provinceCode,
      cityCode,
      districtCode,
      hosname,
      hoscode,
      hostype,
      status
    }
  })
}

// 获取省的数据
export const reqProvince = (dictCode = 'province') => {
  return request.get<any, ProvinceList>(`/admin/cmn/dict/findByDictCode/${dictCode}`)
}

// 获取市区的数据
export const reqCityOrDistrict = (parentId: number) => {
  return request.get<any, CityListType>(`/admin/cmn/dict/findByParentId/${parentId}`)
}

// 获取医院详情
export const reqHospitalMessage = (hospitalId: string) => {
  return request.get<any, IHospitalShow>(`/admin/hosp/hospital/show/${hospitalId}`)
}

// 获取医院科室
export const reqDepartment = (hoscode: string) => {
  return request.get<any, DepartmentList>(`/admin/hosp/department/${hoscode}`)
}

// 获取排班规则
export const reqScheduleRules = ({ page, limit, hoscode, depcode }: ResponseInfo) => {
  return request.get<any, scheduleInfo>(`/admin/hosp/schedule/getScheduleRule/${page}/${limit}/${hoscode}/${depcode}`)
}

// 排班table表格数据
export const reqScheduleRulesTable = ({ hoscode, depcode, workDate }: ScheduleTable) => {
  return request.get<any, ScheduleList>(`/admin/hosp/schedule/findScheduleList/${hoscode}/${depcode}/${workDate}`)
}