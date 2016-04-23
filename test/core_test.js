import { expect } from 'chai'
import { hello } from '../lib/core'

describe('Core', () => {
  describe('hello', () => {
    it('returns hello', () => {
      const result = hello()

      expect(result).to.eq('hello')
    })
  })
})