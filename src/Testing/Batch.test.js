import {  render, screen } from '@testing-library/react';
import Batch from '../Components/Features/Input-Pages/Batch'
describe('Testing Batch Component',()=>{
    test('1.Renders Add Batches Text',()=>{
        render(<Batch />);
        const element = screen.getByText(/Add Batches/i);
        expect(element).toBeInTheDocument();
    })
    test('2.Rendering placeholders correctly',()=>{
        render(<Batch/>)
        const element=screen.getByDisplayValue('Select Year')
        const element2=screen.getByDisplayValue('Select Department')
        const element3=screen.getByDisplayValue('Select Section')
        const element4=screen.getByDisplayValue('Select a Room')

        expect(element).toBeInTheDocument();
        expect(element2).toBeInTheDocument();
        expect(element3).toBeInTheDocument();
        expect(element4).toBeInTheDocument();
    })
    test('3.Rendering add icon',()=>{
        render(<Batch/>)
        const element=screen.getByRole('add')
        expect(element).toBeInTheDocument()
    })
    test('4.Rendering delete icon',()=>{
        render(<Batch batch={
            {
            batch_id: 1,
            dept_name: "CSE",
            non_empty_slots: 0,
            room_no: "A101",
            section: 1,
            year: 4
        }}/>)
        const element=screen.getByRole('delete')
        expect(element).toBeInTheDocument()
    })
})