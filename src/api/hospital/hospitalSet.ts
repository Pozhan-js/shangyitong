// 发送请求获取医院设置列表信息
import { request } from "@/utils/http";
import type { HospitalSetParams, responseHospitalSet } from './model/hospitalSetModule'

//1. 获去医院设置列表数据
export const reqGetHospitalList = ({ page, limit, hosname, hoscode }: HospitalSetParams) => {
  return request.get<any, responseHospitalSet>(`/admin/hosp/hospitalSet/${page}/${limit}`,
    {
      params: {
        hosname,
        hoscode
      }
    })
}
