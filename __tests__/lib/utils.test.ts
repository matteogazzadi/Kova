import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn()', () => {
  it('returns a single class unchanged', () => {
    expect(cn('foo')).toBe('foo')
  })

  it('merges multiple classes', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('filters falsy values', () => {
    expect(cn('foo', false, undefined, null, 'bar')).toBe('foo bar')
  })

  it('handles conditional objects', () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz')
  })

  it('deduplicates conflicting Tailwind utilities (last wins)', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8')
  })

  it('deduplicates conflicting text colors', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('keeps non-conflicting utilities', () => {
    const result = cn('px-4', 'py-2', 'text-sm', 'font-bold')
    expect(result).toBe('px-4 py-2 text-sm font-bold')
  })

  it('handles array inputs', () => {
    expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz')
  })

  it('returns empty string when given no truthy inputs', () => {
    expect(cn(false, undefined, null)).toBe('')
  })
})
