'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { type SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'motion/react'
import Script from 'next/script'
import { sendEmail } from '@/app/actions/sendEmail'
import { trackEvent } from '@/lib/analytics/events'

const schema = z.object({
    firstName: z.string().min(2, { error: 'Required' }),
    lastName: z.string().min(2, { error: 'Required' }),
    email: z.email({ error: 'Invalid email' }),
    websiteUrl: z.string().optional(),
    message: z.string().min(2, { error: 'Required' }),
    turnstileToken: z.string().min(1, { error: 'Bot verification required' }),
})

type Inputs = z.infer<typeof schema>

const shakeVariants = {
    error: { x: [0, -4, 4, -4, 4, 0], transition: { duration: 0.35 } },
}

function Field({
    label,
    error,
    children,
    span2 = false,
}: {
    label: string
    error?: string
    children: React.ReactNode
    span2?: boolean
}) {
    return (
        <motion.div
            animate={error ? 'error' : ''}
            variants={shakeVariants}
            className={`space-y-2${span2 ? ' md:col-span-2' : ''}`}
        >
            <div className="flex items-baseline justify-between">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted">
                    {label}
                </label>
                {error && (
                    <span role="alert" className="text-xs text-red-400">
                        {error}
                    </span>
                )}
            </div>
            {children}
        </motion.div>
    )
}

const baseInput =
    'w-full rounded-xl border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-muted-2 transition-colors focus:outline-none'
const inputOk = 'border-border focus:border-border-strong'
const inputErr = 'border-red-500/50 focus:border-red-500/70'

export function LandingPageForm({
    heading,
    ctaCopy,
    campaignTag,
}: {
    heading?: string
    ctaCopy?: string
    campaignTag: string
}) {
    const [isSuccess, setIsSuccess] = useState(false)
    const [serverError, setServerError] = useState<string | null>(null)
    const [formTouched, setFormTouched] = useState(false)
    const turnstileRef = useRef<HTMLDivElement>(null)
    const widgetIdRef = useRef<string | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        resolver: zodResolver(schema),
        defaultValues: { turnstileToken: '' },
    })

    const turnstileToken = useWatch({ control, name: 'turnstileToken' })

    useEffect(() => {
        return () => {
            if (widgetIdRef.current && window.turnstile) {
                window.turnstile.remove(widgetIdRef.current)
                widgetIdRef.current = null
            }
        }
    }, [])

    const onSubmit = useCallback<SubmitHandler<Inputs>>(
        async (data) => {
            setServerError(null)
            trackEvent('contact_form_submit', { campaign: campaignTag })

            const { turnstileToken: token, ...formData } = data
            const result = await sendEmail({ ...formData, campaignTag }, token)

            if (result.success) {
                setIsSuccess(true)
                trackEvent('contact_form_success', { campaign: campaignTag })
                reset()
                if (widgetIdRef.current && window.turnstile) {
                    window.turnstile.reset(widgetIdRef.current)
                }
            } else {
                setServerError(result.error ?? 'Something went wrong. Please try again.')
                trackEvent('contact_form_error', { error: result.error ?? 'unknown' })
            }
        },
        [reset, campaignTag]
    )

    return (
        <>
            <div className="space-y-6">
                {heading && (
                    <h2 className="text-2xl font-extrabold tracking-tight text-text">
                        {heading}
                    </h2>
                )}

                <AnimatePresence mode="wait">
                    {!isSuccess ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <form
                                onSubmit={(e) => handleSubmit(onSubmit)(e)}
                                onFocus={() => {
                                    if (!formTouched) setFormTouched(true)
                                }}
                                noValidate
                                className="rounded-3xl border border-border bg-surface p-8 md:p-10 space-y-6"
                            >
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <Field label="First name" error={errors.firstName?.message}>
                                        <input
                                            {...register('firstName')}
                                            placeholder="Brian"
                                            aria-invalid={!!errors.firstName}
                                            className={`${baseInput} ${errors.firstName ? inputErr : inputOk}`}
                                        />
                                    </Field>

                                    <Field label="Last name" error={errors.lastName?.message}>
                                        <input
                                            {...register('lastName')}
                                            placeholder="Smith"
                                            aria-invalid={!!errors.lastName}
                                            className={`${baseInput} ${errors.lastName ? inputErr : inputOk}`}
                                        />
                                    </Field>

                                    <Field label="Email" error={errors.email?.message} span2>
                                        <input
                                            {...register('email')}
                                            type="email"
                                            placeholder="hello@yourbusiness.com"
                                            aria-invalid={!!errors.email}
                                            className={`${baseInput} ${errors.email ? inputErr : inputOk}`}
                                        />
                                    </Field>

                                    <Field label="Current website (optional)" error={errors.websiteUrl?.message} span2>
                                        <input
                                            {...register('websiteUrl')}
                                            type="url"
                                            placeholder="https://yourbusiness.com"
                                            className={`${baseInput} ${inputOk}`}
                                        />
                                    </Field>

                                    <Field label="What are you looking for?" error={errors.message?.message} span2>
                                        <textarea
                                            {...register('message')}
                                            rows={4}
                                            placeholder="Tell me a bit about your business and what you need. A few sentences is enough."
                                            aria-invalid={!!errors.message}
                                            className={`${baseInput} ${errors.message ? inputErr : inputOk} resize-none`}
                                        />
                                    </Field>
                                </div>

                                <div>
                                    <div ref={turnstileRef} />
                                </div>

                                {serverError && (
                                    <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3">
                                        <p className="text-sm text-red-400">{serverError}</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting || !turnstileToken}
                                    className="w-full rounded-full bg-text py-4 text-sm font-bold text-bg transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Sending…' : (ctaCopy ?? 'Send my info')}
                                </button>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="rounded-3xl border border-border bg-surface p-12 text-center space-y-6"
                        >
                            <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-border-strong bg-bg">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-text">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-extrabold tracking-tight text-text">
                                    Got it — we&#39;ll be in touch
                                </h2>
                                <p className="text-text-muted">
                                    Expect a reply within one business day.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {formTouched && (
                <Script
                    src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                    strategy="afterInteractive"
                    onReady={() => {
                        if (turnstileRef.current && window.turnstile && !widgetIdRef.current) {
                            widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
                                sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
                                theme: 'dark',
                                callback: (token: string) =>
                                    setValue('turnstileToken', token, { shouldValidate: true }),
                                'expired-callback': () =>
                                    setValue('turnstileToken', '', { shouldValidate: true }),
                                'error-callback': () =>
                                    setValue('turnstileToken', '', { shouldValidate: true }),
                            })
                        }
                    }}
                />
            )}
        </>
    )
}
