import moment from 'moment';
import React, { createContext, ReactNode, useContext } from 'react';
import StatusCode from 'status-code-enum';
import { Activity, ApplyTemplateForm, CompleteTaskForm, CreateActivityForm, CreateTaskForm, CreateTemplateForm, CreateTemplateTaskForm, CreateVerificationCodeForm, RegisterUserForm, Task, Template, Test, UpdateActivityForm, UpdateTemplateForm, User, UseVerificationCodeForm } from '../types/entities';
import { ApiError, ApiResponse, Page } from '../types/types';
import { conf } from './../conf'
import { useAuth } from './useAuth';

export interface ApiContext {
    register: (user: RegisterUserForm) => void
    fakeDelay: (delay: number) => void
    useVerificationCode: (form: UseVerificationCodeForm) => Promise<void>
    sendVerificationCode: (form: CreateVerificationCodeForm) => Promise<void>
    createActivity: (activity: CreateActivityForm) => Promise<void>
    updateActivity: (activity: UpdateActivityForm) => Promise<void>
    getActivity: (id: string) => Promise<Activity>
    getActivities: (page: number, name: string) => Promise<Page<Activity>>
    deleteActivities: (ids: string[]) => Promise<void>
    createTask: (task: CreateTaskForm) => Promise<void>
    deleteTasks: (ids: string[]) => Promise<void>
    getUserTasks: (userId: string, startDate: Date) => Promise<Task[]>,
    completeTasks: (form: CompleteTaskForm) => Promise<void>
    updateUserDans: (userId: string, isAdd: boolean, value: number) => Promise<void>,
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

    const { csrfToken } = useAuth()

    function fakeDelay(delay: number) {
        return new Promise(res => setTimeout(res, delay));
    }

    const register = async (user: RegisterUserForm) => {
        const url = `${conf.mainApiUrl}public/register`
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
            if (res.status === StatusCode.SuccessCreated) {
                console.log("Usuario registrado con éxito")
            } else {
                if (res.status === StatusCode.ServerErrorInternal) {
                    console.log("Ha ocurrido un error al realizar la operación")
                }
                if (res.status === StatusCode.ClientErrorBadRequest) {
                    console.log("El formulario enviado en la petición no es correcto")
                }
                throw new Error(JSON.stringify(res))
            }
        } catch (e) {
            console.log("Ha ocurrido un error al realizar la operación")
        }
    }


    const createActivity = async (activity: CreateActivityForm): Promise<void> => {
        const url = `${conf.mainApiUrl}private/activity`
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
            if (!res.ok) {
                throw new Error(JSON.stringify(res))
            }
        } catch (e) {
            throw Error('Error creating the activity')
        }
    }

    const updateActivity = async (activity: UpdateActivityForm): Promise<void> => {
        const url = `${conf.mainApiUrl}private/activity`
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
            if (!res.ok) {
                throw new Error(JSON.stringify(res))
            }
        } catch (e) {
            throw Error('Error updating the activity')
        }
    }


    const getActivity = async (id: string): Promise<Activity> => {
        const url = `${conf.mainApiUrl}private/activity/${id}`
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
            if (!res.ok) {
                throw new Error(JSON.stringify(res))
            }
            const resObject = await res.json()
            result = resObject.obj
        } catch (e) {
            throw Error('Error getting the activity')
        }
        if (result === undefined) {
            throw Error('Error getting the activity')
        }

        return result
    }


    const getActivities = async (page: number, name: string): Promise<Page<Activity>> => {
        const url = `${conf.mainApiUrl}private/activity/search`
        const options: RequestInit = {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({ page, name, pageSize: 10 }),
            headers: new Headers({
                'X-API-CSRF': csrfToken ? csrfToken : '',
                'content-type': 'application/json',
            })
        }
        let result = []
        try {
            const res = await fetch(url, options)
            if (!res.ok) {
                throw new Error(JSON.stringify(res))
            }
            const resObject = await res.json()
            result = resObject.obj
        } catch (e) {
            throw Error('Error al obtener las actividades')
        }
        return result
    }

    const deleteActivities = async (ids: string[]): Promise<void> => {
        const url = `${conf.mainApiUrl}private/activity`
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
            if (!res.ok) {
                throw new Error(JSON.stringify(res))
            }
        } catch (e) {
            throw Error('Error deleting activities')
        }
    }

    const createTask = async (task: CreateTaskForm): Promise<void> => {
        const url = `${conf.mainApiUrl}private/task`
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
            if (!res.ok) {
                throw new Error(JSON.stringify(res))
            }
        } catch (e) {
            throw Error('Error creating the task')
        }
    }

    const completeTasks = async (form: CompleteTaskForm): Promise<void> => {
        const url = `${conf.mainApiUrl}private/task/complete`
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
            if (!res.ok) {
                throw new Error(JSON.stringify(res))
            }
        } catch (e) {
            throw Error('Error creating the task')
        }
    }


    const getUserTasks = async (userId: string, startDate: Date): Promise<Task[]> => {
        const dateStr = moment(startDate).format(conf.dateUrlFormat)
        console.log(conf.dateUrlFormat)
        console.log(dateStr)
        const url = `${conf.mainApiUrl}private/task/search`
        const options: RequestInit = {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({ userId: userId, lowerDate: moment(startDate).format(conf.dateInputFormat), upperDate: moment(startDate).add(7, 'days').format(conf.dateInputFormat) }),
            headers: new Headers({
                'X-API-CSRF': csrfToken ? csrfToken : '',
                'content-type': 'application/json',
            })
        }
        let result = []
        try {
            const res = await fetch(url, options)
            if (!res.ok) {
                throw new Error(JSON.stringify(res))
            }
            const resObject = await res.json()
            result = resObject.obj.content
        } catch (e) {
            throw Error('Error obtaining user tasks')
        }
        return result
    }

    const deleteTasks = async (ids: string[]): Promise<void> => {
        const url = `${conf.mainApiUrl}private/task`
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
            if (!res.ok) {
                throw new Error(JSON.stringify(res))
            }
        } catch (e) {
            throw Error('Error deleting tasks')
        }
    }

    const getUser = async (id: string): Promise<User> => {
        const url = `${conf.mainApiUrl}private/user/${id}`
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
            if (!res.ok) {
                throw new Error(JSON.stringify(res))
            }
            const resObject = await res.json()
            result = resObject
        } catch (e) {
            throw Error('Error getting the user')
        }
        if (result === undefined) {
            throw Error('Error getting the user')
        }

        return result
    }

    const updateUserDans = async (userId: string, isAdd: boolean, value: number): Promise<void> => {
        const url = `${conf.mainApiUrl}private/user/${userId}/dans?add=${isAdd}&value=${value}`
        const options: RequestInit = {
            credentials: 'include',
            method: 'PATCH',
            headers: new Headers({
                'X-API-CSRF': csrfToken ? csrfToken : '',
                'content-type': 'application/json',
            })
        }
        try {
            const res = await fetch(url, options)
            if (!res.ok) {
                throw new Error(JSON.stringify(res))
            }
        } catch (e) {
            throw Error('Error updating user dans')
        }
    }

    const sendVerificationCode = async (form: CreateVerificationCodeForm): Promise<void> => {
        const url = `${conf.mainApiUrl}public/newVerificationCode`
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
            const resObject: ApiResponse = await res.json()
            if (!res.ok) {
                throw new Error()
            }
        } catch (e) {
            throw e
        }
    }

    const useVerificationCode = async (form: UseVerificationCodeForm): Promise<void> => {
        const url = `${conf.mainApiUrl}public/useVerificationCode`
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
            const resObject: ApiResponse = await res.json()
            if (!res.ok) {
                throw new ApiError({ cause: res.status, message: resObject.message, errCode: resObject.errCode })
            }
        } catch (e) {
            throw e
        }
    }

    const createTemplate = async (form: CreateTemplateForm): Promise<void> => {
        const url = `${conf.mainApiUrl}private/template`
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
            if (!res.ok) {
                throw new Error(JSON.stringify(res))
            }
        } catch (e) {
            throw Error('Error creating the template')
        }
    }

    const getTemplates = async (page: number, name: string, userId: string): Promise<Page<Template>> => {
        const url = `${conf.mainApiUrl}private/template/search`
        const options: RequestInit = {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({ page, name, pageSize: 10, userId }),
            headers: new Headers({
                'X-API-CSRF': csrfToken ? csrfToken : '',
                'content-type': 'application/json',
            })
        }
        let result = []
        try {
            const res = await fetch(url, options)
            if (!res.ok) {
                throw new Error(JSON.stringify(res))
            }
            const resObject = await res.json()
            result = resObject.obj
        } catch (e) {
            throw Error('Error obtaining templates')
        }
        return result
    }

    const getAllUserTemplates = async (userId: string): Promise<Page<Template>> => {
        const url = `${conf.mainApiUrl}private/template/search`
        const options: RequestInit = {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({ pageSize: 0, userId }),
            headers: new Headers({
                'X-API-CSRF': csrfToken ? csrfToken : '',
                'content-type': 'application/json',
            })
        }
        let result = []
        try {
            const res = await fetch(url, options)
            if (!res.ok) {
                throw new Error(JSON.stringify(res))
            }
            const resObject = await res.json()
            result = resObject.obj
        } catch (e) {
            throw Error('Error obtaining templates')
        }
        return result
    }


    const deleteTemplates = async (ids: string[]): Promise<void> => {
        const url = `${conf.mainApiUrl}private/template`
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
            if (!res.ok) {
                throw new Error(JSON.stringify(res))
            }
        } catch (e) {
            throw Error('Error deleting templates')
        }
    }


    const getTemplate = async (id: string): Promise<Template> => {
        const url = `${conf.mainApiUrl}private/template/${id}`
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
            if (!res.ok) {
                throw new Error(JSON.stringify(res))
            }
            const resObject = await res.json()
            result = resObject.obj
        } catch (e) {
            throw Error('Error getting the Template')
        }
        if (result === undefined) {
            throw Error('Error getting the Template')
        }

        return result
    }

    const updateTemplate = async (template: UpdateTemplateForm): Promise<void> => {
        const url = `${conf.mainApiUrl}private/template`
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
            if (!res.ok) {
                throw new Error(JSON.stringify(res))
            }
        } catch (e) {
            throw Error('Error updating the template')
        }
    }

    const createTemplateTask = async (templateId: string, task: CreateTemplateTaskForm): Promise<void> => {
        const url = `${conf.mainApiUrl}private/template/${templateId}/tasks`
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
            if (!res.ok) {
                throw new Error(JSON.stringify(res))
            }
        } catch (e) {
            throw Error('Error creating the task')
        }
    }

    const deleteTemplateTasks = async (ids: string[]): Promise<void> => {
        const url = `${conf.mainApiUrl}private/template/tasks`
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
            if (!res.ok) {
                throw new Error(JSON.stringify(res))
            }
        } catch (e) {
            throw Error('Error deleting template tasks')
        }
    }

    const applyTemplate = async (templateId: string, form: ApplyTemplateForm): Promise<void> => {
        const url = `${conf.mainApiUrl}private/template/${templateId}/apply`
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
            if (!res.ok) {
                throw new Error(JSON.stringify(res))
            }
        } catch (e) {
            throw Error('Error applying the template')
        }
    }



    const value: ApiContext = {
        register,
        fakeDelay,
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
        updateUserDans,
        createTemplate,
        getTemplate,
        getTemplates,
        getAllUserTemplates,
        deleteTemplates,
        updateTemplate,
        deleteTemplateTasks,
        createTemplateTask,
        applyTemplate
    }

    return (
        <ApiContext.Provider value={value}>
            {children}
        </ApiContext.Provider>
    )
}
