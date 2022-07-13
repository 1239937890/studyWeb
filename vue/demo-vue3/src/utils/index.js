import {
	video,
	audio,
	ask,
	doctor,
	hospital,
	illness,
	talk,
	health,
	live,
	checkIllness,
	article
} from "@/utils/scrollType";
import {
	sjkzr,
	sybk,
	myzs,
	yysh,
	lyzx,
	kpdh
} from "@/utils/columnType";
export function getSearchVal(val) {
	const text = '试试搜索'
	switch (val) {
		case hospital:
			return `${text}医院名称`;
		case doctor:
			return `${text}医生名`;
		case illness:
			return `${text}疾病名`;
		case video:
			return '搜索科普视频';
		case audio:
			return '搜索专家音频';
		case ask:
			return '搜索名医问答';
		case talk:
			return '搜索话题';
		case health:
			return `${text}自测名`;
		case live:
			return '搜索直播';
		case checkIllness:
			return '试试搜索疾病名';
		case article:
			return "搜索疾病、症状、问题";
	}
}
export function getTitleVal(val) {
	switch (val) {
		case hospital:
			return '医院';
		case doctor:
			return '医生';
		case illness:
			return '疾病';
		case video:
			return '科普视频';
		case audio:
			return '专家音频';
		case ask:
			return '名医问答';
		case talk:
			return '话题';
		case health:
			return '自测题'
		case checkIllness:
			return '疾病排名医院'
		case article:
			return '文章';
	}
}

export function getColumnType(val) {
	switch (val) {
		case sjkzr:
			return '三甲科主任';
		case sybk:
			return '食药百科';
		case myzs:
			return '名医诊室';
		case yysh:
			return '营养生活';
		case lyzx:
			return '良医在线';
		case kpdh:
			return '科普动画';
	}
}
export function getUserUrl(val) {
	switch (val) {
		case 1:
			return '/pages/login/wxUser';
		case 2:
			return '/pages/login/baiduUser';
		case 3:
			return '';
		case 4:
		case 5:
			return '/pages/login/radUser';
	}
}