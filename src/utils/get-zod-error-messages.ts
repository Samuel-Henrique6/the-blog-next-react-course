import { ZodError } from 'zod'

type Issue = ZodError['issues'][number]

export function getZodErrorMessages(error: ZodError): string[] {
    return error.issues.map((issue: Issue) => issue.message)
}
