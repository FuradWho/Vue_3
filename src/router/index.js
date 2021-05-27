import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/components/Login";
import Home from "@/components/Home";
import Welcome from "@/components/Welcome";
import PersonalInformation from '@/components/PersonalInformation'
import CourseInformation from '@/components/CourseInformation'
import NewCourseInformation from '@/components/NewCourseInformation'
import TeacherAddCourse from "@/components/TeacherAddCourse";
import TeacherCourseInformation from "@/components/TeacherCourseInformation";
import TeacherCourseManage from "@/components/TeacherCourseManage";
import TeacherPersonalInformation from "@/components/TeacherPersonalInformation";
import ClassManagement from "@/components/ClassManagement";
import ProfessionalManagement from "@/components/ProfessionalManagement";
import CourseManagement from "@/components/CourseManagement";

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/Login',
            name: 'Login',
            component: Login
        },
        {
            path: '/',
            redirect: '/Login'
        },
        {
            path: '/Home',
            name: 'Home',
            component: Home,
            redirect: '/welcome',
            children: [
                {
                    path: '/welcome',
                    component: Welcome,
                },
                {
                    path: '/PersonalInformation',
                    component: PersonalInformation
                },
                {
                    path: '/CourseInformation',
                    component: CourseInformation
                },
                {
                    path: '/NewCourseInformation',
                    component: NewCourseInformation
                },
                {
                    path: '/TeacherPersonalInformation',
                    component: TeacherPersonalInformation
                },
                {
                    path: '/TeacherCourseManage',
                    component: TeacherCourseManage
                },
                {
                    path: '/TeacherCourseInformation',
                    component: TeacherCourseInformation
                },
                {
                    path: '/TeacherAddCourse',
                    component: TeacherAddCourse
                },
                {
                    path: '/ProfessionalManagement',
                    component: ProfessionalManagement
                },
                {
                    path: '/ClassManagement',
                    component: ClassManagement
                },
                {
                    path: '/CourseManagement',
                    component: CourseManagement
                }

            ]
        },
        {
            path: '/Reg',
            name: 'Reg',
            component: () => import('@/components/Reg'),
        },
        {
            path: '/forgetPwd',
            name: 'forgetPwd',
            component: () => import('@/components/ForgetPwd'),
        },

    ]
})

router.beforeEach((to, from, next) =>{

    if(to.path === '/Login') return next();
    if(to.path === '/Reg') return next();
    if(to.path === '/forgetPwd') return next();
    const token = window.sessionStorage.getItem('Authorization')
    console.log(token)
    if(!token) return next('/Login')
    next()

})

export default router
