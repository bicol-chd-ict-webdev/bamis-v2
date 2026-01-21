import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Budget\ProgramController::index
 * @see app/Http/Controllers/Budget/ProgramController.php:30
 * @route '/budget/programs'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/budget/programs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Budget\ProgramController::index
 * @see app/Http/Controllers/Budget/ProgramController.php:30
 * @route '/budget/programs'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\ProgramController::index
 * @see app/Http/Controllers/Budget/ProgramController.php:30
 * @route '/budget/programs'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Budget\ProgramController::index
 * @see app/Http/Controllers/Budget/ProgramController.php:30
 * @route '/budget/programs'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Budget\ProgramController::index
 * @see app/Http/Controllers/Budget/ProgramController.php:30
 * @route '/budget/programs'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Budget\ProgramController::index
 * @see app/Http/Controllers/Budget/ProgramController.php:30
 * @route '/budget/programs'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Budget\ProgramController::index
 * @see app/Http/Controllers/Budget/ProgramController.php:30
 * @route '/budget/programs'
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
* @see \App\Http\Controllers\Budget\ProgramController::store
 * @see app/Http/Controllers/Budget/ProgramController.php:42
 * @route '/budget/programs'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/budget/programs',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Budget\ProgramController::store
 * @see app/Http/Controllers/Budget/ProgramController.php:42
 * @route '/budget/programs'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\ProgramController::store
 * @see app/Http/Controllers/Budget/ProgramController.php:42
 * @route '/budget/programs'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Budget\ProgramController::store
 * @see app/Http/Controllers/Budget/ProgramController.php:42
 * @route '/budget/programs'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\ProgramController::store
 * @see app/Http/Controllers/Budget/ProgramController.php:42
 * @route '/budget/programs'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Budget\ProgramController::update
 * @see app/Http/Controllers/Budget/ProgramController.php:49
 * @route '/budget/programs/{program}'
 */
export const update = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/budget/programs/{program}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Budget\ProgramController::update
 * @see app/Http/Controllers/Budget/ProgramController.php:49
 * @route '/budget/programs/{program}'
 */
update.url = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { program: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { program: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    program: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        program: typeof args.program === 'object'
                ? args.program.id
                : args.program,
                }

    return update.definition.url
            .replace('{program}', parsedArgs.program.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\ProgramController::update
 * @see app/Http/Controllers/Budget/ProgramController.php:49
 * @route '/budget/programs/{program}'
 */
update.put = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Budget\ProgramController::update
 * @see app/Http/Controllers/Budget/ProgramController.php:49
 * @route '/budget/programs/{program}'
 */
update.patch = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Budget\ProgramController::update
 * @see app/Http/Controllers/Budget/ProgramController.php:49
 * @route '/budget/programs/{program}'
 */
    const updateForm = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\ProgramController::update
 * @see app/Http/Controllers/Budget/ProgramController.php:49
 * @route '/budget/programs/{program}'
 */
        updateForm.put = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Budget\ProgramController::update
 * @see app/Http/Controllers/Budget/ProgramController.php:49
 * @route '/budget/programs/{program}'
 */
        updateForm.patch = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Budget\ProgramController::destroy
 * @see app/Http/Controllers/Budget/ProgramController.php:56
 * @route '/budget/programs/{program}'
 */
export const destroy = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/budget/programs/{program}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Budget\ProgramController::destroy
 * @see app/Http/Controllers/Budget/ProgramController.php:56
 * @route '/budget/programs/{program}'
 */
destroy.url = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { program: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { program: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    program: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        program: typeof args.program === 'object'
                ? args.program.id
                : args.program,
                }

    return destroy.definition.url
            .replace('{program}', parsedArgs.program.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\ProgramController::destroy
 * @see app/Http/Controllers/Budget/ProgramController.php:56
 * @route '/budget/programs/{program}'
 */
destroy.delete = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Budget\ProgramController::destroy
 * @see app/Http/Controllers/Budget/ProgramController.php:56
 * @route '/budget/programs/{program}'
 */
    const destroyForm = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\ProgramController::destroy
 * @see app/Http/Controllers/Budget/ProgramController.php:56
 * @route '/budget/programs/{program}'
 */
        destroyForm.delete = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const programs = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default programs