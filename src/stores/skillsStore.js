import { defineStore } from 'pinia'

export const useSkillsStore = defineStore('skills', {
    state: () => ({
        skillCategories: [
            {
                id: 1,
                name: '前端开发',
                icon: 'fas fa-code',
                skills: [
                    { id: 101, name: 'HTML5 / CSS3' },
                    { id: 102, name: 'JavaScript' },
                    { id: 103, name: 'Vue.js' },
                    { id: 104, name: 'Element-UI' },
                    { id: 105, name: 'Webpack' },
                    { id: 106, name: '响应式设计' },
                ]
            },
            {
                id: 2,
                name: '后端开发',
                icon: 'fas fa-code',
                skills: [
                    { id: 201, name: 'Java' },
                    { id: 202, name: 'SpringBoot' },
                    { id: 203, name: 'Mysql' },
                    { id: 204, name: 'MyBatis' },
                ]
            },
            {
                id: 3,
                name: '语言',
                icon: 'fas fa-paint-brush',
                skills: [
                    { id: 301, name: 'Java' },
                    { id: 302, name: 'C++' },
                    { id: 303, name: 'Python' },
                    { id: 304, name: 'Vue.js' },
                    { id: 305, name: 'HTML' },
                    { id: 306, name: 'CSS' },
                    { id: 307, name: 'JavaScript' }
                ]
            },
            {
                id: 4,
                name: '其他技能',
                icon: 'fas fa-cogs',
                skills: [
                    { id: 401, name: 'Git' },
                    { id: 402, name: 'Axure' },
                    { id: 403, name: 'Markdown' },
                    { id: 404, name: '团队协作' },
                ]
            }
        ],
        // 用于首页展示的简化技能信息
        homepageSkills: [
            {
                id: 1,
                name: '前端开发',
                icon: 'fas fa-code',
                skills: [
                    { id: 101, name: 'HTML5 / CSS3' },
                    { id: 102, name: 'JavaScript / TypeScript' },
                    { id: 103, name: 'Vue.js' },
                    { id: 104, name: '响应式设计' },
                ]
            },
            {
                id: 2,
                name: '语言',
                icon: 'fas fa-paint-brush',
                skills: [
                    { id: 201, name: 'Java' },
                    { id: 202, name: 'C++' },
                    { id: 203, name: 'Python' },
                    { id: 206, name: 'Markdown' },
                    { id: 207, name: 'Vue.js' }
                ]
            }
        ]
    }),

    getters: {
        // 获取所有技能类别
        getAllSkillCategories(state) {
            return state.skillCategories;
        },

        // 获取用于首页展示的技能类别
        getHomepageSkillCategories(state) {
            return state.homepageSkills;
        },

        // 获取特定类别的所有技能
        getSkillsByCategory: (state) => {
            return (categoryId) => {
                const category = state.skillCategories.find(cat => cat.id === categoryId);
                return category ? category.skills : [];
            }
        }
    },

    actions: {
        // 添加新的技能类别
        addSkillCategory(category) {
            const newId = Math.max(0, ...this.skillCategories.map(c => c.id)) + 1;
            this.skillCategories.push({ ...category, id: newId, skills: [] });
        },

        // 更新技能类别
        updateSkillCategory(updatedCategory) {
            const index = this.skillCategories.findIndex(c => c.id === updatedCategory.id);
            if (index !== -1) {
                const currentSkills = this.skillCategories[index].skills;
                this.skillCategories[index] = { ...updatedCategory, skills: currentSkills };
            }
        },

        // 删除技能类别
        deleteSkillCategory(id) {
            this.skillCategories = this.skillCategories.filter(c => c.id !== id);
        },

        // 添加技能到类别
        addSkill(categoryId, skill) {
            const category = this.skillCategories.find(c => c.id === categoryId);
            if (category) {
                const newSkillId = Math.max(0, ...category.skills.map(s => s.id)) + 1;
                category.skills.push({ ...skill, id: newSkillId });
            }
        },

        // 更新技能
        updateSkill(categoryId, updatedSkill) {
            const category = this.skillCategories.find(c => c.id === categoryId);
            if (category) {
                const skillIndex = category.skills.findIndex(s => s.id === updatedSkill.id);
                if (skillIndex !== -1) {
                    category.skills[skillIndex] = { ...updatedSkill };
                }
            }
        },

        // 删除技能
        deleteSkill(categoryId, skillId) {
            const category = this.skillCategories.find(c => c.id === categoryId);
            if (category) {
                category.skills = category.skills.filter(s => s.id !== skillId);
            }
        }
    }
})
