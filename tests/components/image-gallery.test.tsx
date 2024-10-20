import { render, screen } from '@testing-library/react'
import ImageGallery from '../../src/components/ImageGallery'

describe('ImageGallery', () => {

    const renderComponent = ({images} : {images?: string[]}) => {
        const {container} = render(<ImageGallery gallery={images}/>)
        return {
            container,
            imageSrc : screen.queryAllByRole('img')
        }
    }

    it('should render empty gallery text', () => {
        const { container } = renderComponent({});
        expect(container).toBeEmptyDOMElement()
    })

    it('should render a list of images', () => {
      const images: string[] = ["https://image1.com", "https://image2.com"];

      const { imageSrc } = renderComponent({ images });

      images.forEach((url, index) => {
        expect(imageSrc[index]).toHaveAttribute("src", url);
      });
    })
})