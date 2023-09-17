import moment from 'moment';
import React, { createContext, ReactNode, useContext } from 'react';
import StatusCode from 'status-code-enum';
import { Activity, ApplyTemplateForm, CompleteTaskForm, CreateActivityForm, CreateTaskForm, CreateTemplateForm, CreateTemplateTaskForm, CreateVerificationCodeForm, RegisterUserForm, StatsForm, StatsResult, Task, Template, Test, UpdateActivityForm, UpdateTemplateForm, User, UseVerificationCodeForm } from '../types/entities';
import { ApiError, ApiResponse, Page } from '../types/types';
import { conf } from './../conf'
import { useAuth } from './useAuth';

export interface ApiContext {
    register: (user: RegisterUserForm) => void
    useVerificationCode: (form: UseVerificationCodeForm) => Promise<void>
    sendVerificationCode: (form: CreateVerificationCodeForm) => Promise<void>
    createActivity: (activity: CreateActivityForm) => Promise<void>
    updateActivity: (activity: UpdateActivityForm) => Promise<void>
    getActivity: (id: string) => Promise<Activity>
    getActivities: (page: number, name: string, userId: string) => Promise<Page<Activity>>
    deleteActivities: (ids: string[]) => Promise<void>
    createTask: (task: CreateTaskForm) => Promise<void>
    deleteTasks: (ids: string[]) => Promise<void>
    getUserTasks: (userId: string, startDate: Date) => Promise<Task[]>,
    completeTasks: (form: CompleteTaskForm) => Promise<void>
    getUser: (id: string) => Promise<User>
    createTemplate: (form: CreateTemplateForm) => Promise<void>
    getTemplates: (page: number, name: string, userId: string) => Promise<Page<Template>>
    getAllUserTemplates: (userId: string) => Promise<Page<Template>>
    deleteTemplates: (ids: string[]) => Promise<void>
    getTemplate: (id: string) => Promise<Template>
    updateTemplate: (template: UpdateTemplateForm) => Promise<void>
    createTemplateTask: (templateId: string, task: CreateTemplateTaskForm) => Promise<void>
    deleteTemplateTasks: (ids: string[]) => Promise<void>
    applyTemplate: (templateId: string, form: ApplyTemplateForm) => Promise<void>
    getStats: (form: StatsForm) => Promise<StatsResult>
    completeTutorial: (userId: string) => Promise<void>
}


const ApiContext = createContext<ApiContext>({} as any)

export const useApi = () => {
    const ctx = useContext(ApiContext)
    if (ctx === null) {
        throw new Error('useApi() can only be used on the descendants of ApiProvider')
    } else {
        return ctx
    }
}

export const ApiProvider = ({ children }: { children: ReactNode }) => {

    const { user, csrfToken } = useAuth()
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL

    const register = async (user: RegisterUserForm) => {
        const url = `${apiUrl}public/register`
        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: new Headers({
                'content-type': 'application/json',
            })
        }
        let result = []
        try {
            const res = await fetch(url, options)
            const resObject: ApiResponse<unknown> = await res.json()
            if (!res.ok) {
                throw new ApiError({ cause: res.status, message: resObject.message, errCode: resObject.errCode })
            }
        } catch (e) {
            throw e
        }
    }


    const createActivity = async (activity: CreateActivityForm): Promise<void> => {
        const url = `${apiUrl}private/activity`
        const options: RequestInit = {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(activity),
            headers: new Headers({
                'content-type': 'application/json',
                'X-API-CSRF': csrfToken ? csrfToken : '',
            })
        }
        try {
            const res = await fetch(url, options)
            const resObject: ApiResponse<unknown> = await res.json()
            if (!res.ok) {
                throw new ApiError({ cause: res.status, message: resObject.message, errCode: resObject.errCode })
            }
        } catch (e) {
            throw e
        }
    }

    const updateActivity = async (activity: UpdateActivityForm): Promise<void> => {
        const url = `${apiUrl}private/activity`
        const options: RequestInit = {
            credentials: 'include',
            method: 'PUT',
            body: JSON.stringify(activity),
            headers: new Headers({
                'X-API-CSRF': csrfToken ? csrfToken : '',
                'content-type': 'application/json',
            })
        }
        try {
            const res = await fetch(url, options)
            const resObject: ApiResponse<unknown> = await res.json()
            if (!res.ok) {
                throw new ApiError({ cause: res.status, message: resObject.message, errCode: resObject.errCode })
            }
        } catch (e) {
            throw e
        }
    }


    const getActivity = async (id: string): Promise<Activity> => {
        const url = `${apiUrl}private/activity/${id}`
        const options: RequestInit = {
            credentials: 'include',
            method: 'GET',
            headers: new Headers({
                'X-API-CSRF': csrfToken ? csrfToken : '',
                'content-type': 'application/json',
            })
        }
        let result: Activity | undefined = undefined
        try {
            const res = await fetch(url, options)
            const resObject: ApiResponse<Activity> = await res.json()
            if (!res.ok) {
                throw new ApiError({ cause: res.status, message: resObject.message, errCode: resObject.errCode })
            }
            result = resObject.obj
        } catch (e) {
            throw e
        }
        return result
    }


    const getActivities = async (page: number, name: string, userId: string): Promise<Page<Activity>> => {
        const url = `${apiUrl}private/activity/search`
        const options: RequestInit = {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({ page, name: name.trim(), pageSize: 10, userId }),
            headers: new Headers({
                'X-API-CSRF': csrfToken ? csrfToken : '',
                'content-type': 'application/json',
            })
        }
        let result: any
        try {
            const res = await fetch(url, options)
            const resObject: ApiResponse<unknown> = await res.json()
            if (!res.ok) {
                throw new ApiError({ cause: res.status, message: resObject.message, errCode: resObject.errCode })
            }
            result = resObject.obj
        } catch (e) {
            throw e
        }
        return result
    }

    const deleteActivities = async (ids: string[]): Promise<void> => {
        const url = `${apiUrl}private/activity`
        const options: RequestInit = {
            credentials: 'include',
            method: 'DELETE',
            body: JSON.stringify({ activityIds: ids }),
            headers: new Headers({
                'X-API-CSRF': csrfToken ? csrfToken : '',
                'content-type': 'application/json',
            })
        }
        try {
            const res = await fetch(url, options)
            const resObject: ApiResponse<unknown> = await res.json()
            if (!res.ok) {
                throw new ApiError({ cause: res.status, message: resObject.message, errCode: resObject.errCode })
            }
        } catch (e) {
            throw e
        }
    }

    const createTask = async (task: CreateTaskForm): Promise<void> => {
        const url = `${apiUrl}private/task`
        const options: RequestInit = {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(task),
            headers: new Headers({
                'X-API-CSRF': csrfToken ? csrfToken : '',
                'content-type': 'application/json',
            })
        }
        try {
            const res = await fetch(url, options)
            const resObject: ApiResponse<unknown> = await res.json()
            if (!res.ok) {
                throw new ApiError({ cause: res.status, message: resObject.message, errCode: resObject.errCode })
            }
        } catch (e) {
            throw e
        }
    }

    const completeTasks = async (form: CompleteTaskForm): Promise<void> => {
        const url = `${apiUrl}private/task/complete`
        const options: RequestInit = {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(form),
            headers: new Headers({
                'X-API-CSRF': csrfToken ? csrfToken : '',
                'content-type': 'application/json',
            })
        }
        try {
            const res = await fetch(url, options)
            const resObject: ApiResponse<unknown> = await res.json()
            if (!res.ok) {
                throw new ApiError({ cause: res.status, message: resObject.message, errCode: resObject.errCode })
            }
        } catch (e) {
            throw e
        }
    }


    const getUserTasks = async (userId: string, startDate: Date): Promise<Task[]> => {
        const dateStr = moment(startDate).format(conf.dateUrlFormat)
        const url = `${apiUrl}private/task/search`
        const options: RequestInit = {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({ userId: userId, lowerDate: moment(startDate).format(conf.dateInputFormat), upperDate: moment(startDate).add(6, 'days').format(conf.dateInputFormat) }),
            headers: new Headers({
                'X-API-CSRF': csrfToken ? csrfToken : '',
                'content-type': 'application/json',
            })
        }
        let result: Task[]
        try {
            const res = await fetch(url, options)
            const resObject: ApiResponse<Page<Task>> = await res.json()
            if (!res.ok) {
                throw new ApiError({ cause: res.status, message: resObject.message, errCode: resObject.errCode })
            }
            result = resObject.obj.content
        } catch (e) {
            throw e
        }
        return result
    }

    const deleteTasks = async (ids: string[]): Promise<void> => {
        const url = `${apiUrl}private/task`
        const options: RequestInit = {
            credentials: 'include',
            method: 'DELETE',
            body: JSON.stringify({ taskIds: ids }),
            headers: new Headers({
                'X-API-CSRF': csrfToken ? csrfToken : '',
                'content-type': 'application/json',
            })
        }
        try {
            const res = await fetch(url, options)
            const resObject: ApiResponse<unknown> = await res.json()
            if (!res.ok) {
                throw new ApiError({ cause: res.status, message: resObject.message, errCode: resObject.errCode })
            }
        } catch (e) {
            throw e
        }
    }

    const getUser = async (id: string): Promise<User> => {
        const url = `${apiUrl}private/user/${id}`
        const options: RequestInit = {
            credentials: 'include',
            method: 'GET',
            headers: new Headers({
                'X-API-CSRF': csrfToken ? csrfToken : '',
                'content-type': 'application/json',
            })
        }
        let result: User | undefined = undefined
        try {
            const res = await fetch(url, options)
            const resObject: ApiResponse<User> = await res.json()
            if (!res.ok) {
                throw new ApiError({ cause: res.status, message: resObject.message, errCode: resObject.errCode })
            }
            result = resObject.obj
        } catch (e) {
            throw e
        }
        return result
    }

    const sendVerificationCode = async (form: CreateVerificationCodeForm): Promise<void> => {
        const url = `${apiUrl}public/newVerificationCode`
        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify(form),
            headers: new Headers({
                'content-type': 'application/json',
            })
        }
        let result = []
        try {
            const res = await fetch(url, options)
            const resObject: ApiResponse<unknown> = await res.json()
            if (!res.ok) {
                throw new Error()
            }
        } catch (e) {
            throw e
        }
    }

    const useVerificationCode = async (form: UseVerificationCodeForm): Promise<void> => {
        const url = `${apiUrl}public/useVerificationCode`
        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify(form),
            headers: new Headers({
                'content-type': 'application/json',
            })
        }
        let result = []
        try {
            const res = await fetch(url, options)
            const resObject: ApiResponse<unknown> = await res.json()
            if (!res.ok) {
                throw new ApiError({ cause: res.status, message: resObject.message, errCode: resObject.errCode })
            }
        } catch (e) {
            throw e
        }
    }

    const createTemplate = async (form: CreateTemplateForm): Promise<void> => {
        const url = `${apiUrl}private/template`
        const options: RequestInit = {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(form),
            headers: new Headers({
                'X-API-CSRF': csrfToken ? csrfToken : '',
                'content-type': 'application/json',
            })
        }
        try {
            const res = await fetch(url, options)
            const resObject: ApiResponse<unknown> = await res.json()
            if (!res.ok) {
                throw new ApiError({ cause: res.status, message: resObject.message, errCode: resObject.errCode })
            }
        } catch (e) {
            throw e
        }
    }

    const getTemplates = async (page: number, name: string, userId: string): Promise<Page<Template>> => {
        const url = `${apiUrl}private/template/search`
        const options: RequestInit = {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({ page, name: name.trim(), pageSize: 10, userId }),
            headers: new Headers({
                'X-API-CSRF': csrfToken ? csrfToken : '',
                'content-type': 'application/json',
            })
        }
        let result: Page<Template>
        try {
            const res = await fetch(url, options)
            const resObject: ApiResponse<Page<Template>> = await res.json()
            if (!res.ok) {
                throw new ApiError({ cause: res.status, message: resObject.message, errCode: resObject.errCode })
            }
            result = resObject.obj
        } catch (e) {
            throw e
        }
        return result
    }

    const getAllUserTemplates = async (userId: string): Promise<Page<Template>> => {
        const url = `${apiUrl}private/template/search`
        const options: RequestInit = {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({ pageSize: 0, userId }),
            headers: new Headers({
                'X-API-CSRF': csrfToken ? csrfToken : '',
                'content-type': 'application/json',
            })
        }
        let result: Page<Template>
        try {
            const res = await fetch(url, options)
            const resObject: ApiResponse<Page<Template>> = await res.json()
            if (!res.ok) {
                throw new ApiError({ cause: res.status, message: resObject.message, errCode: resObject.errCode })
            }
            result = resObject.obj
        } catch (e) {
            throw e
        }
        return result
    }


    const deleteTemplates = async (ids: string[]): Promise<void> => {
        const url = `${apiUrl}private/template`
        const options: RequestInit = {
            credentials: 'include',
            method: 'DELETE',
            body: JSON.stringify({ templateIds: ids }),
            headers: new Headers({
                'X-API-CSRF': csrfToken ? csrfToken : '',
                'content-type': 'application/json',
            })
        }
        try {
            const res = await fetch(url, options)
            const resObject: ApiResponse<Page<Template>> = await res.json()
            if (!res.ok) {
                throw new ApiError({ cause: res.status, message: resObject.message, errCode: resObject.errCode })
            }
        } catch (e) {
            throw e
        }
    }


    const getTemplate = async (id: string): Promise<Template> => {
        const url = `${apiUrl}private/template/${id}`
        const options: RequestInit = {
            credentials: 'include',
            method: 'GET',
            headers: new Headers({
                'X-API-CSRF': csrfToken ? csrfToken : '',
                'content-type': 'application/json',
            })
        }
        let result: Template | undefined = undefined
        try {
            const res = await fetch(url, options)
            const resObject: ApiResponse<Template> = await res.json()
            if (!res.ok) {
                throw new ApiError({ cause: res.status, message: resObject.message, errCode: resObject.errCode })
            }
            result = resObject.obj
        } catch (e) {
            throw e
        }
        return result
    }

    const updateTemplate = async (template: UpdateTemplateForm): Promise<void> => {
        const url = `${apiUrl}private/template`
        const options: RequestInit = {
            credentials: 'include',
            method: 'PUT',
            body: JSON.stringify(template),
            headers: new Headers({
                'X-API-CSRF': csrfToken ? csrfToken : '',
                'content-type': 'application/json',
            })
        }
        try {
            const res = await fetch(url, options)
            const resObject: ApiResponse<unknown> = await res.json()
            if (!res.ok) {
                throw new ApiError({ cause: res.status, message: resObject.message, errCode: resObject.errCode })
            }
        } catch (e) {
            throw e
        }
    }

    const createTemplateTask = async (templateId: string, task: CreateTemplateTaskForm): Promise<void> => {
        const url = `${apiUrl}private/template/${templateId}/tasks`
        const options: RequestInit = {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(task),
            headers: new Headers({
                'X-API-CSRF': csrfToken ? csrfToken : '',
                'content-type': 'application/json',
            })
        }
        try {
            const res = await fetch(url, options)
            const resObject: ApiResponse<unknown> = await res.json()
            if (!res.ok) {
                throw new ApiError({ cause: res.status, message: resObject.message, errCode: resObject.errCode })
            }
        } catch (e) {
            throw e
        }
    }

    const deleteTemplateTasks = async (ids: string[]): Promise<void> => {
        const url = `${apiUrl}private/template/tasks`
        const options: RequestInit = {
            credentials: 'include',
            method: 'DELETE',
            body: JSON.stringify({ taskIds: ids }),
            headers: new Headers({
                'X-API-CSRF': csrfToken ? csrfToken : '',
                'content-type': 'application/json',
            })
        }
        try {
            const res = await fetch(url, options)
            const resObject: ApiResponse<unknown> = await res.json()
            if (!res.ok) {
                throw new ApiError({ cause: res.status, message: resObject.message, errCode: resObject.errCode })
            }
        } catch (e) {
            throw e
        }
    }

    const applyTemplate = async (templateId: string, form: ApplyTemplateForm): Promise<void> => {
        const url = `${apiUrl}private/template/${templateId}/apply`
        const options: RequestInit = {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(form),
            headers: new Headers({
                'X-API-CSRF': csrfToken ? csrfToken : '',
                'content-type': 'application/json',
            })
        }
        try {
            const res = await fetch(url, options)
            const resObject: ApiResponse<unknown> = await res.json()
            if (!res.ok) {
                throw new ApiError({ cause: res.status, message: resObject.message, errCode: resObject.errCode })
            }
        } catch (e) {
            throw e
        }
    }

    const getStats = async (form: StatsForm): Promise<StatsResult> => {
        const url = `${apiUrl}private/task/stats`
        const options: RequestInit = {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(form),
            headers: new Headers({
                'X-API-CSRF': csrfToken ? csrfToken : '',
                'content-type': 'application/json',
            })
        }
        try {
            const res = await fetch(url, options)
            const resObject: ApiResponse<StatsResult> = await res.json()
            if (!res.ok) {
                throw new ApiError({ cause: res.status, message: resObject.message, errCode: resObject.errCode })
            }
            return resObject.obj
        } catch (e) {
            throw e
        }
    }

    const completeTutorial = async (userId: string): Promise<void> => {
        const url = `${apiUrl}private/user/${userId}/completeTutorial`
        const options: RequestInit = {
            credentials: 'include',
            method: 'POST',
            headers: new Headers({
                'X-API-CSRF': csrfToken ? csrfToken : '',
                'content-type': 'application/json',
            })
        }
        try {
            const res = await fetch(url, options)
            const resObject: ApiResponse<StatsResult> = await res.json()
            if (!res.ok) {
                throw new ApiError({ cause: res.status, message: resObject.message, errCode: resObject.errCode })
            }
        } catch (e) {
            throw e
        }
    }


    const value: ApiContext = {
        register,
        useVerificationCode,
        sendVerificationCode,
        createActivity,
        updateActivity,
        getActivity,
        getActivities,
        deleteActivities,
        createTask,
        deleteTasks,
        completeTasks,
        getUserTasks,
        getUser,
        createTemplate,
        getTemplate,
        getTemplates,
        getAllUserTemplates,
        deleteTemplates,
        updateTemplate,
        deleteTemplateTasks,
        createTemplateTask,
        applyTemplate,
        getStats,
        completeTutorial
    }

    return (
        <ApiContext.Provider value={value}>
            {children}
        </ApiContext.Provider>
    )
}
