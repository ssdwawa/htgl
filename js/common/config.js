aviationApp.factory('config', function () {
    var projectName = 'http://www.xahtrc.com/';
    return {
        interface: {
            EM: {
                getAllEnterprise: projectName + '/back/companymanage/selectbycondition',
                addEnterprise: projectName + '/back/companymanage/add',
                editEnterprise: projectName + '/back/companymanage/edit',
                getEnterpriseVip: projectName + '/back/companymanage/selectbycondition',
                getEnterpriseInfo: projectName + '/back/companymanage/selectbyid',
                stopOrStart: projectName + '/back/companymanage/changeStatus',
                resetPwd: projectName + '/back/companymanage/resetPwd',
                editVip: projectName + '/back/companymanage/editAccount',
                getCompanyByName: projectName + '/back/companymanage/getCompanyByName',
                checkName: projectName + '/back/companymanage/checkName',
                checkCode: projectName + '/back/companymanage/checkCode'
            },
            JM: {
                getJobApplyRecord: projectName + '/back/deliverRecord/selectByCondition',
                getJobList: projectName + '/back/jobSetting/selectbycondition',
                addJob: projectName + '/back/jobSetting/addJob',
                editJob: projectName + '/back/jobSetting/editJob',
                changeJobStatus: projectName + '/back/jobSetting/changeStatus',
                getJobType: projectName + '/common/jobSetting/getallposition',
                getJobByType: projectName + '/common/jobSetting/getallposition',
                getCVList: projectName + '/back/resume/getAll',
                getResumeInfo: projectName + '/back/resume/getOneResume',
                getCompanyListByName: projectName + '/back/jobSetting/selectByCompanyName',
                getJobInfo: projectName + '/back/jobSetting/selectById',
                notice: projectName + '/enterprise/position/updateInterview',
                isJobApply: projectName + '/back/position/checkPostById'
            },
            PF: {
                getManagerList: projectName + '/back/account/getAll',
                addManager: projectName + '/back/account/add',
                editManager: projectName + '/back/account/edit',
                changeStatus: projectName + '/back/account/changeStatus',
                resetManagerPwd: projectName + '/back/account/resetPwd',
                getDiplomaList: projectName + '/common/degree/getAll',
                deleteDiploma: projectName + '/back/degree/delete',
                addDiploma: projectName + '/back/degree/add',
                editDiploma: projectName + '/back/degree/edit',
                moveDiploma: projectName + '/back/degree/move',
                getExperienceList: projectName + '/common/work/getAll',
                deleteExperience: projectName + '/back/work/delete',
                addExperience: projectName + '/back/work/add',
                editExperience: projectName + '/back/work/edit',
                moveExperience: projectName + '/back/work/move',
                getFieldList: projectName + '/common/industrysector/getallsectors',
                deleteField: projectName + '/back/industrysector/delete',
                addField: projectName + '/back/industrysector/add',
                editField: projectName + '/back/industrysector/edit',
                moveField: projectName + '/back/industrysector/move',
                getTagList: projectName + '/common/specialtag/getalltags',
                deleteTag: projectName + '/back/specialtag/delete',
                moveTag: projectName + '/back/specialtag/move',
                editTag: projectName + '/back/specialtag/edit',
                addTag: projectName + '/back/specialtag/add',
                getPositionList: projectName + '/common/jobSetting/getallposition',
                deletePosition: projectName + '/back/jobSetting/delete',
                movePosition: projectName + '/back/jobSetting/move',
                editPosition: projectName + '/back/jobSetting/edit',
                addPosition: projectName + '/back/jobSetting/add',
                getCityList: projectName + '/common/companymanage/getcitysbypid',
                provinceList: projectName + '/common/companymanage/getallprovinces'
            },
            HOME: {
                login: projectName + '/login',
                logout: projectName + '/logout',
                changePwd: projectName + '/changePwd'
            },
            E_EM:{
                getEnterpriseInfo: projectName + '/enterprise/manage/basicInfo',
                getCompanyInfo: projectName + '/enterprise/manage/getCompanyInfo',
                submitEnterpriseInfo: projectName + '/enterprise/manage/editInfo'
            },
            E_JM: {
                getJobApplyRecord: projectName + '/enterprise/position/requireList',
                getJobList: projectName + '/enterprise/position/selectbycondition',
                addJob: projectName + '/enterprise/position/addJob',
                editJob: projectName + '/enterprise/position/editJob',
                changeJobStatus: projectName + '/enterprise/position/changeStatus',
                checkResume: projectName + '/enterprise/position/checkResume',
                getJobInfo: projectName + '/enterprise/position/selectById',
                isJobApply: projectName + '/enterprise/position/checkPostById'
            },
            DC: {
                getResumeCountData: projectName + '/back/position/statisticsData',
                getPositionCountData:projectName + '/back/position/statisticsPositionData'
            }
        }
    }
});