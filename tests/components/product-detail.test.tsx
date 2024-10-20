import { render, screen } from '@testing-library/react'
import ProductDetail from '../../src/components/ProductDetail'
import { products } from '../mocks/data'
import { server } from '../mocks/server'
import { http, HttpResponse } from 'msw'

describe('ProductDetail', () => {
    it('should render the list of products', async () => {
        render(<ProductDetail productId={1} />)
        expect(await screen.findByText(new RegExp(products[0].name))).toBeInTheDocument()
        expect(await screen.findByText(new RegExp(products[0].price.toString()))).toBeInTheDocument()
    })

    it('should render message if product not found', async () => {
        server.use(http.get('/products/8', () => HttpResponse.json(null)))

        render(<ProductDetail productId={8} />)

        const errorMessage = await screen.findByText(/not found/i)
        expect(errorMessage).toBeInTheDocument()
    })

    it('should render message if product id is invalid', async () => {

        render(<ProductDetail productId={24} />)

        const errorMessage = await screen.findByText(/unexpected end of JSON input/i)
        expect(errorMessage).toBeInTheDocument()
    })
})