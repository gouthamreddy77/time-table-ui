import {  fireEvent, render, screen } from '@testing-library/react';
import App from '../App'
describe('Testing Navbar and side Menu', () => { 
    test('1.Rendering Time Table App Text',()=>{
        render(<App />);
        const element = screen.getByRole('register');
        expect(element).toBeInTheDocument();

        fireEvent.click(element)
        expect(screen.getByText('Time Table')).toBeInTheDocument()
    })
    test('2.Rendering User Icon',()=>{
        render(<App />);
        const element2 = screen.getByRole('usericon')
        expect(element2).toBeInTheDocument()
    })
    test('3.Rendering Side Menu',async ()=>{
        render(<App />);
        const element = screen.getByRole('sidemenu');
        expect(element).toBeInTheDocument()
    })
 })