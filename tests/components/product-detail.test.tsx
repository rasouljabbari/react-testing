import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import ProductDetail from '../../src/components/ProductDetail'
import { server } from '../mocks/server'
import { delay, http, HttpResponse } from 'msw'
import { db } from '../mocks/db'
import AllProviders from '../AllProviders'

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
        render(<ProductDetail productId={productId} />, {wrapper: AllProviders})
        expect(await screen.findByText(new RegExp(product!.name))).toBeInTheDocument()
        expect(await screen.findByText(new RegExp(product!.price.toString()))).toBeInTheDocument()
    })

    it('should render message if product not found', async () => {
        server.use(http.get('/products/8', () => HttpResponse.json(null)))

        render(<ProductDetail productId={8}/>, {wrapper: AllProviders})

        const errorMessage = await screen.findByText(/not found/i)
        expect(errorMessage).toBeInTheDocument()
    })

    it('should render an error if data fetching fails', async () => {
        server.use(http.get('/products/8', () => HttpResponse.error()))

        render(<ProductDetail productId={8}/>, {wrapper: AllProviders})

        const errorMessage = await screen.findByText(/error/i)
        expect(errorMessage).toBeInTheDocument()
    })

    it('should render an error message when there is an error', async () => {
        server.use(http.get('/products/8', () => HttpResponse.error()));

        render(<ProductDetail productId={8}/>, {wrapper: AllProviders})

        expect(await screen.findByText(/error/i)).toBeInTheDocument();
    });

    it('should render a loading indicator when fetching data', async () => {
        server.use(http.get('/products/8', async () => {
            await delay();
            return HttpResponse.json([]);
        }));

        render(<ProductDetail productId={8}/>, {wrapper: AllProviders})

        screen.debug()

        expect(await screen.findByText(/loading/i)).toBeInTheDocument();
    });

    it('should remove the loading indicator after data is fetched', async () => {
        render(<ProductDetail productId={productId}/>, {wrapper: AllProviders})

        await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
    })

    it('should remove the loading indicator if data fetching fails', async () => {
        server.use(http.get('/products/4', () => HttpResponse.error()));

        render(<ProductDetail productId={productId}/>, {wrapper: AllProviders})

        await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
    })
})