import { it, expect, describe } from 'vitest'

describe('group', () => {
    it('should render categories request', async () => {
        const response = await fetch('/categories')
        const data = await response.json()
        expect(data).toHaveLength(3)
    })
})