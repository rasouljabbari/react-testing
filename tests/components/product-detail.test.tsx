import { render, screen } from '@testing-library/react'
import ProductDetail from '../../src/components/ProductDetail'
import { server } from '../mocks/server'
import { http, HttpResponse } from 'msw'
import { db } from '../mocks/db'

describe('ProductDetail', () => {

    let productId: number;

    beforeAll(() => {
      const product = db.product.create();
      productId = product.id;
    });

    afterAll(() => {
        db.product.delete({where: {id: {equals: productId}}})
    })

    it('should render product details', async () => {
        const product = db.product.findFirst({where: {id : {equals: productId}}})
        render(<ProductDetail productId={productId} />)
        expect(await screen.findByText(new RegExp(product!.name))).toBeInTheDocument()
        expect(await screen.findByText(new RegExp(product!.price.toString()))).toBeInTheDocument()
    })

    it('should render message if product not found', async () => {
        server.use(http.get('/products/8', () => HttpResponse.json(null)))

        render(<ProductDetail productId={8} />)

        const errorMessage = await screen.findByText(/not found/i)
        expect(errorMessage).toBeInTheDocument()
    })

    it('should render an error if data fetching fails', async () => {
        server.use(http.get('/products/20', () => HttpResponse.error()))

        render(<ProductDetail productId={20} />)

        const errorMessage = await screen.findByText(/error/i)
        expect(errorMessage).toBeInTheDocument()
    })

    // it('should render message if product id is invalid', async () => {

    //     render(<ProductDetail productId={24} />)

    //     const errorMessage = await screen.findByText(/unexpected end of JSON input/i)
    //     expect(errorMessage).toBeInTheDocument()
    // })
})