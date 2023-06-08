import moment from 'moment';
import React, { createContext, ReactNode, useContext } from 'react';
import StatusCode from 'status-code-enum';
import { Activity, CompleteTaskForm, CreateActivityForm, CreateTaskForm, CreateVerificationCodeForm, RegisterUserForm, Task, Test, UpdateActivityForm, User, UseVerificationCodeForm } from '../types/entities';
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
    deleteTask: (id: string) => Promise<void>
    getUserTasks: (userId: string, startDate: Date) => Promise<Task[]>,
    completeTasks: (form: CompleteTaskForm) => Promise<void>
    updateUserDans: (userId: string, isAdd: boolean, value: number) => Promise<void>,
    getUser: (id: string) => Promise<User>
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

    const deleteTask = async (id: string): Promise<void> => {
        const url = `${conf.mainApiUrl}private/task/${id}`
        const options: RequestInit = {
            credentials: 'include',
            method: 'DELETE',
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
            throw Error('Error deleting task')
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
        deleteTask,
        completeTasks,
        getUserTasks,
        getUser,
        updateUserDans
    }

    return (
        <ApiContext.Provider value={value}>
            {children}
        </ApiContext.Provider>
    )
}
