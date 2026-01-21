import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Budget\ReportDownloadController::__invoke
 * @see app/Http/Controllers/Budget/ReportDownloadController.php:13
 * @route '/budget/reports/download/{filename}'
 */
export const __invoke = (args: { filename: string | number } | [filename: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: __invoke.url(args, options),
    method: 'get',
})

__invoke.definition = {
    methods: ["get","head"],
    url: '/budget/reports/download/{filename}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Budget\ReportDownloadController::__invoke
 * @see app/Http/Controllers/Budget/ReportDownloadController.php:13
 * @route '/budget/reports/download/{filename}'
 */
__invoke.url = (args: { filename: string | number } | [filename: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { filename: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    filename: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        filename: args.filename,
                }

    return __invoke.definition.url
            .replace('{filename}', parsedArgs.filename.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\ReportDownloadController::__invoke
 * @see app/Http/Controllers/Budget/ReportDownloadController.php:13
 * @route '/budget/reports/download/{filename}'
 */
__invoke.get = (args: { filename: string | number } | [filename: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: __invoke.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Budget\ReportDownloadController::__invoke
 * @see app/Http/Controllers/Budget/ReportDownloadController.php:13
 * @route '/budget/reports/download/{filename}'
 */
__invoke.head = (args: { filename: string | number } | [filename: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: __invoke.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Budget\ReportDownloadController::__invoke
 * @see app/Http/Controllers/Budget/ReportDownloadController.php:13
 * @route '/budget/reports/download/{filename}'
 */
    const __invokeForm = (args: { filename: string | number } | [filename: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: __invoke.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Budget\ReportDownloadController::__invoke
 * @see app/Http/Controllers/Budget/ReportDownloadController.php:13
 * @route '/budget/reports/download/{filename}'
 */
        __invokeForm.get = (args: { filename: string | number } | [filename: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: __invoke.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Budget\ReportDownloadController::__invoke
 * @see app/Http/Controllers/Budget/ReportDownloadController.php:13
 * @route '/budget/reports/download/{filename}'
 */
        __invokeForm.head = (args: { filename: string | number } | [filename: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: __invoke.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    __invoke.form = __invokeForm
const ReportDownloadController = { __invoke }

export default ReportDownloadController