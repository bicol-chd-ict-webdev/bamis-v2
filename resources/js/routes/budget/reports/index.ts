import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Budget\Reports\ReportController::__invoke
 * @see app/Http/Controllers/Budget/Reports/ReportController.php:14
 * @route '/budget/reports'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/budget/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Budget\Reports\ReportController::__invoke
 * @see app/Http/Controllers/Budget/Reports/ReportController.php:14
 * @route '/budget/reports'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\Reports\ReportController::__invoke
 * @see app/Http/Controllers/Budget/Reports/ReportController.php:14
 * @route '/budget/reports'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Budget\Reports\ReportController::__invoke
 * @see app/Http/Controllers/Budget/Reports/ReportController.php:14
 * @route '/budget/reports'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Budget\Reports\ReportController::__invoke
 * @see app/Http/Controllers/Budget/Reports/ReportController.php:14
 * @route '/budget/reports'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Budget\Reports\ReportController::__invoke
 * @see app/Http/Controllers/Budget/Reports/ReportController.php:14
 * @route '/budget/reports'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Budget\Reports\ReportController::__invoke
 * @see app/Http/Controllers/Budget/Reports/ReportController.php:14
 * @route '/budget/reports'
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
* @see \App\Http\Controllers\Budget\ReportDownloadController::download
 * @see app/Http/Controllers/Budget/ReportDownloadController.php:13
 * @route '/budget/reports/download/{filename}'
 */
export const download = (args: { filename: string | number } | [filename: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/budget/reports/download/{filename}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Budget\ReportDownloadController::download
 * @see app/Http/Controllers/Budget/ReportDownloadController.php:13
 * @route '/budget/reports/download/{filename}'
 */
download.url = (args: { filename: string | number } | [filename: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return download.definition.url
            .replace('{filename}', parsedArgs.filename.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\ReportDownloadController::download
 * @see app/Http/Controllers/Budget/ReportDownloadController.php:13
 * @route '/budget/reports/download/{filename}'
 */
download.get = (args: { filename: string | number } | [filename: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Budget\ReportDownloadController::download
 * @see app/Http/Controllers/Budget/ReportDownloadController.php:13
 * @route '/budget/reports/download/{filename}'
 */
download.head = (args: { filename: string | number } | [filename: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Budget\ReportDownloadController::download
 * @see app/Http/Controllers/Budget/ReportDownloadController.php:13
 * @route '/budget/reports/download/{filename}'
 */
    const downloadForm = (args: { filename: string | number } | [filename: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: download.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Budget\ReportDownloadController::download
 * @see app/Http/Controllers/Budget/ReportDownloadController.php:13
 * @route '/budget/reports/download/{filename}'
 */
        downloadForm.get = (args: { filename: string | number } | [filename: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Budget\ReportDownloadController::download
 * @see app/Http/Controllers/Budget/ReportDownloadController.php:13
 * @route '/budget/reports/download/{filename}'
 */
        downloadForm.head = (args: { filename: string | number } | [filename: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    download.form = downloadForm
const reports = {
    index: Object.assign(index, index),
download: Object.assign(download, download),
}

export default reports