import { type } from "os";

export interface HospitalList {
  id: string;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {
    hostypeString: string;
    fullAddress: string;
  };
  hoscode: string;
  hosname: string;
  hostype: string;
  provinceCode: string;
  cityCode: string;
  districtCode: string;
  address: string;
  logoData: string;
  intro: string;
  route: string;
  status: StatusType;
}

export interface HospitalItem extends HospitalList {
  bookingRule: IBookingRule;
}

export type HospitalListType = HospitalItem[];

export interface HospitalListResponse {
  content: HospitalListType;
  totalElements: number;
}

export type StatusType = 0 | 1;

export interface IHospitalItemParams {
  page: number;
  pageSize: number;
  provinceCode: string;
  cityCode: string;
  districtCode: string;
  hosname: string;
  hoscode: string;
  hostype: string;
  status: StatusType;
}

// 省数据
export interface ProvinceItem {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: object;
  parentId: number;
  name: string;
  value: string;
  dictCode: null;
  hasChildren: boolean;
}

export type ProvinceList = ProvinceItem[];

// 市级数据
export interface CityItem {
  id: number;
  createTime: string;
  updateTimeD: string;
  isDeleted: number;
  param: object;
  parentId: number;
  name: string;
  value: string;
  dictCode: string;
}

export type CityListType = CityItem[];

//
export interface IBookingRule {
  cycle: number;
  releaseTime: string;
  stopTime: string;
  quitDay: number;
  quitTime: string;
  rule: [string];
}

// 医院详情
export interface IHospitalShow {
  bookingRule: IBookingRule;
  hospital: HospitalList;
}

// =====================================
// 科室管理
export interface DepartmentInfo {
  depcode: string;
  depname: string;
  children: DepartmentList | null;
  disabled?: boolean;
}

export type DepartmentList = DepartmentInfo[];

// 排班
export interface scheduleInfo {
  total: number;
  bookingScheduleList: BookingRulesList;
  baseMap: {
    hosname: string;
  };
}

export interface BookingRulesItem {
  workDate: string;
  workDateMd: null;
  dayOfWeek: string;
  docCount: number;
  reservedNumber: number;
  availableNumber: number;
  status: null;
}

export type BookingRulesList = BookingRulesItem[];

export interface ResponseInfo {
  page: number;
  limit: number;
  hoscode: string;
  depcode: string;
}

// 排班列表table
export interface ScheduleItem {
  id: string;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {
    dayOfWeek: string;
    depname: string;
    hosname: string;
  };
  hoscode: string;
  depcode: string;
  title: string;
  docname: string;
  skill: string;
  workDate: string;
  workTime: number;
  reservedNumber: number;
  availableNumber: number;
  amount: number;
  status: number;
  hosScheduleId: string;
}

export type ScheduleList = ScheduleItem[]

export interface ScheduleTable {
  hoscode: string;
  depcode: string;
  workDate: string;
}
