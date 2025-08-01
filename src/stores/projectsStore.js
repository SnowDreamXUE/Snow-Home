import { defineStore } from 'pinia'

export const useProjectsStore = defineStore('projects', {
    state: () => ({
        projects: [
            {
                id: 1,
                title: 'Authority-System-vue',
                description: '基于vue-admin-element二次开发的后台权限管理系统前端部分',
                technologies: ['Vue.js', 'Element-UI', 'Vuex', 'Vue-router'],
                category: ['前端'],
                demoUrl: null,
                codeUrl: 'https://gitee.com/SnowDreamXUE/authority-system-vue',
                featured: true
            },
            {
                id: 2,
                title: 'Authority-System',
                description: '前后端分离的权限管理系统，包含⽤⼾管理、菜单管理、部⻔管理和⻆⾊管理功能。采⽤ SpringBoot 和 SpringSecurity 实现认证授权',
                technologies: ['Java', 'SpringBoot', 'SpringSecurity', 'MybatisPlus', 'Redis'],
                category: ['后端'],
                demoUrl: null,
                codeUrl: 'https://gitee.com/SnowDreamXUE/authority-system',
                featured: true
            },
            {
                id: 3,
                title: 'BiliBiliDownloader',
                description: 'BiliBiliDownloader 是⼀款专注于哔哩哔哩（B站）视频下载的⼯具，⽀持扫码登录、视频链接解析以及视频⾳频分离下载',
                technologies: ['Vue.js', 'SpringBoot', 'ffmpeg'],
                category: ['前端', '后端'],
                demoUrl: null,
                codeUrl: 'https://github.com/SnowDreamXUE/BiliBliliDownloader',
                featured: false
            },
            {
                id: 4,
                title: 'Vue-Study-Demo',
                description: '在学习Vue过程中，制作的一些小项目',
                technologies: ['Vue.js', 'Element-UI'],
                category: ['前端'],
                demoUrl: null,
                codeUrl: 'https://github.com/SnowDreamXUE/vue-study-demo',
                featured: false
            },
            {
                id: 5,
                title: 'Hexo博客',
                description: '使用Hexo搭建的博客，加入了Github-Action完成自动部署',
                technologies: ['Hexo', 'Github-Action'],
                category: ['Hexo'],
                demoUrl: null,
                codeUrl: 'https://github.com/SnowDreamXUE/SnowDreamXUE.github.io',
                featured: false
            },
            {
                id: 6,
                title: 'BiliBiliDownloader-electron',
                description: 'BiliBiliDownloader-electron使用electron重新构建BiliBiliDownloader，加入aria2c下载工具，支持扫码登录，视频解析下载',
                technologies: ['Vue.js', 'electron', 'ffmpeg', 'aria2c'],
                category: ['前端', 'Electron'],
                demoUrl: null,
                codeUrl: 'https://github.com/SnowDreamXUE/BiliBiliDownloader-electron',
                featured: false
            },
            {
                id: 7,
                title: 'SnowBlog-vue',
                description: 'SnowBlog Vue 是一个功能完整的个人博客前端应用，采用现代化的技术栈构建，提供了优雅的用户界面和流畅的用户体验。本项目是 SnowBlog 博客系统的前台展示部分。',
                technologies: ['Vue.js', 'Element-UI', 'Vuex', 'Vue-router'],
                category: ['前端'],
                demoUrl: null,
                codeUrl: 'https://github.com/SnowDreamXUE/SnowBlog-vue',
                featured: false
            },
            {
                id: 8,
                title: 'SnowBlog-back',
                description: 'SnowBlog 后台管理系统是一个功能完整的博客内容管理平台，采用现代化的技术栈构建，为博客管理员提供直观易用的管理界面。本项目是 SnowBlog 博客系统的后台管理部分。',
                technologies:  ['Vue.js', 'Element-UI', 'Vuex', 'Vue-router'],
                category: ['前端'],
                demoUrl: null,
                codeUrl: 'https://github.com/SnowDreamXUE/SnowBlog-back',
                featured: false
            },
            {
                id: 9,
                title: 'SnowBlog-java',
                description: 'SnowBlog Java 是一个功能完整的个人博客后端服务，采用 Spring Boot + MyBatis Plus 技术栈构建，提供了完整的 RESTful API 接口。本项目是 SnowBlog 博客系统的核心后端服务。',
                technologies: ['Java', 'Spring Boot', 'MyBatis Plus', 'Jwt'],
                category: ['后端'],
                demoUrl: null,
                codeUrl: 'https://github.com/SnowDreamXUE/SnowBlog-java',
                featured: false
            }
        ],
        categories: ['全部', '前端', '后端', 'Hexo', 'Electron'],
    }),

    getters: {
        // 获取精选项目
        featuredProjects: (state) => {
            return state.projects.filter(project => project.featured)
        },

        // 按类别筛选项目
        getProjectsByCategory: (state) => {
            return (category) => {
                if (category === '全部') {
                    return state.projects;
                }
                // 修改这里，使用Array.prototype.some()方法来判断项目是否属于指定的类别
                return state.projects.filter(project =>
                    Array.isArray(project.category) && project.category.includes(category)
                );
            }
        },

        // 获取随机三个项目
        randomProjects: (state) => {
            // 创建项目数组的副本
            const projectsCopy = [...state.projects];
            const randomProjects = [];
            const numToSelect = Math.min(3, projectsCopy.length);

            // 随机选择三个项目
            for (let i = 0; i < numToSelect; i++) {
                const randomIndex = Math.floor(Math.random() * projectsCopy.length);
                randomProjects.push(projectsCopy[randomIndex]);
                projectsCopy.splice(randomIndex, 1); // 移除已选项目，避免重复选择
            }

            return randomProjects;
        },

        // 根据 ID 获取单个项目
        getProjectById: (state) => {
            return (id) => {
                return state.projects.find(project => project.id === id);
            }
        }
    },

    actions: {
        // 添加新项目
        addProject(project) {
            // 生成新的 ID
            const newId = Math.max(0, ...this.projects.map(p => p.id)) + 1;
            this.projects.push({ ...project, id: newId });
        },

        // 更新项目
        updateProject(updatedProject) {
            const index = this.projects.findIndex(p => p.id === updatedProject.id);
            if (index !== -1) {
                this.projects[index] = { ...updatedProject };
            }
        },

        // 删除项目
        deleteProject(id) {
            this.projects = this.projects.filter(p => p.id !== id);
        },

        // 切换项目的精选状态
        toggleFeatured(id) {
            const project = this.projects.find(p => p.id === id);
            if (project) {
                project.featured = !project.featured;
            }
        }
    }
})
