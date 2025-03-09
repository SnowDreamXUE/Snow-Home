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
        ],
        categories: ['全部', '前端', '后端', 'Hexo'],
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
