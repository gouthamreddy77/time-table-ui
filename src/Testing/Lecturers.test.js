import {  render, screen } from '@testing-library/react';
import Lecturers from '../Components/Features/Input-Pages/Lecturers'
describe('Testing Lecture Component',()=>{
    test('1.Renders Add Batches Text',()=>{
        render(<Lecturers />);
        const element = screen.getByText(/Add Professors/i);
        expect(element).toBeInTheDocument();
    })
    test('2.Rendering placeholders correctly',()=>{
        render(<Lecturers/>)
        const element=screen.getByPlaceholderText('Enter Professor id')
        const element2=screen.getByPlaceholderText('Enter Professor Name')

        expect(element).toBeInTheDocument();
        expect(element2).toBeInTheDocument();
    })
    test('3.Rendering add icon',()=>{
        render(<Lecturers/>)
        const element=screen.getByRole('add')
        expect(element).toBeInTheDocument()
    })
    test('4.Rendering delete icon',()=>{
        render(<Lecturers Lecturers={
            {
                professor_id: "1",
                professor_name: "Dr. C Kiran Mai"
        }}/>)
        const element=screen.getByRole('delete')
        expect(element).toBeInTheDocument()
    })
})