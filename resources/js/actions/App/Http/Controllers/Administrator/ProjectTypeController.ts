import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Administrator\ProjectTypeController::index
 * @see app/Http/Controllers/Administrator/ProjectTypeController.php:24
 * @route '/administrator/project-types'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/administrator/project-types',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\ProjectTypeController::index
 * @see app/Http/Controllers/Administrator/ProjectTypeController.php:24
 * @route '/administrator/project-types'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\ProjectTypeController::index
 * @see app/Http/Controllers/Administrator/ProjectTypeController.php:24
 * @route '/administrator/project-types'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\ProjectTypeController::index
 * @see app/Http/Controllers/Administrator/ProjectTypeController.php:24
 * @route '/administrator/project-types'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Administrator\ProjectTypeController::index
 * @see app/Http/Controllers/Administrator/ProjectTypeController.php:24
 * @route '/administrator/project-types'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Administrator\ProjectTypeController::index
 * @see app/Http/Controllers/Administrator/ProjectTypeController.php:24
 * @route '/administrator/project-types'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Administrator\ProjectTypeController::index
 * @see app/Http/Controllers/Administrator/ProjectTypeController.php:24
 * @route '/administrator/project-types'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Administrator\ProjectTypeController::store
 * @see app/Http/Controllers/Administrator/ProjectTypeController.php:31
 * @route '/administrator/project-types'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/administrator/project-types',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Administrator\ProjectTypeController::store
 * @see app/Http/Controllers/Administrator/ProjectTypeController.php:31
 * @route '/administrator/project-types'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\ProjectTypeController::store
 * @see app/Http/Controllers/Administrator/ProjectTypeController.php:31
 * @route '/administrator/project-types'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Administrator\ProjectTypeController::store
 * @see app/Http/Controllers/Administrator/ProjectTypeController.php:31
 * @route '/administrator/project-types'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\ProjectTypeController::store
 * @see app/Http/Controllers/Administrator/ProjectTypeController.php:31
 * @route '/administrator/project-types'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Administrator\ProjectTypeController::update
 * @see app/Http/Controllers/Administrator/ProjectTypeController.php:38
 * @route '/administrator/project-types/{project_type}'
 */
export const update = (args: { project_type: string | number } | [project_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/administrator/project-types/{project_type}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Administrator\ProjectTypeController::update
 * @see app/Http/Controllers/Administrator/ProjectTypeController.php:38
 * @route '/administrator/project-types/{project_type}'
 */
update.url = (args: { project_type: string | number } | [project_type: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project_type: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    project_type: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project_type: args.project_type,
                }

    return update.definition.url
            .replace('{project_type}', parsedArgs.project_type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\ProjectTypeController::update
 * @see app/Http/Controllers/Administrator/ProjectTypeController.php:38
 * @route '/administrator/project-types/{project_type}'
 */
update.put = (args: { project_type: string | number } | [project_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Administrator\ProjectTypeController::update
 * @see app/Http/Controllers/Administrator/ProjectTypeController.php:38
 * @route '/administrator/project-types/{project_type}'
 */
update.patch = (args: { project_type: string | number } | [project_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Administrator\ProjectTypeController::update
 * @see app/Http/Controllers/Administrator/ProjectTypeController.php:38
 * @route '/administrator/project-types/{project_type}'
 */
    const updateForm = (args: { project_type: string | number } | [project_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\ProjectTypeController::update
 * @see app/Http/Controllers/Administrator/ProjectTypeController.php:38
 * @route '/administrator/project-types/{project_type}'
 */
        updateForm.put = (args: { project_type: string | number } | [project_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Administrator\ProjectTypeController::update
 * @see app/Http/Controllers/Administrator/ProjectTypeController.php:38
 * @route '/administrator/project-types/{project_type}'
 */
        updateForm.patch = (args: { project_type: string | number } | [project_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Administrator\ProjectTypeController::destroy
 * @see app/Http/Controllers/Administrator/ProjectTypeController.php:45
 * @route '/administrator/project-types/{project_type}'
 */
export const destroy = (args: { project_type: string | number } | [project_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/administrator/project-types/{project_type}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Administrator\ProjectTypeController::destroy
 * @see app/Http/Controllers/Administrator/ProjectTypeController.php:45
 * @route '/administrator/project-types/{project_type}'
 */
destroy.url = (args: { project_type: string | number } | [project_type: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project_type: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    project_type: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project_type: args.project_type,
                }

    return destroy.definition.url
            .replace('{project_type}', parsedArgs.project_type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\ProjectTypeController::destroy
 * @see app/Http/Controllers/Administrator/ProjectTypeController.php:45
 * @route '/administrator/project-types/{project_type}'
 */
destroy.delete = (args: { project_type: string | number } | [project_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Administrator\ProjectTypeController::destroy
 * @see app/Http/Controllers/Administrator/ProjectTypeController.php:45
 * @route '/administrator/project-types/{project_type}'
 */
    const destroyForm = (args: { project_type: string | number } | [project_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\ProjectTypeController::destroy
 * @see app/Http/Controllers/Administrator/ProjectTypeController.php:45
 * @route '/administrator/project-types/{project_type}'
 */
        destroyForm.delete = (args: { project_type: string | number } | [project_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ProjectTypeController = { index, store, update, destroy }

export default ProjectTypeController