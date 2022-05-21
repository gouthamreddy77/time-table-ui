import {  fireEvent,render, screen } from '@testing-library/react';
import Mapping from '../Components/Features/Mapping/Mapping'
import LectureMapping from '../Components/Features/Mapping/LectureMapping'
describe('Testing Mapping Component',()=>{
    test('1.Renders Mapping Text',()=>{
        render(<Mapping />);
        const element = screen.getByText('Mapping')
        expect(element).toBeInTheDocument();
    })

    test('2.Rendering placeholders correctly',()=>{
        render(<Mapping/>)
        const element=screen.getAllByDisplayValue('Select Batch')[0]
        const element2=screen.getByDisplayValue('Select Lecture')
        const element3=screen.getByDisplayValue('Select Lab')
        const element4=screen.getByDisplayValue('Select Elective')
        const element5=screen.getAllByDisplayValue('Select Professor')[0]
        const element6=screen.getByDisplayValue('Is Pairable')
        const element7=screen.getByDisplayValue('Select Elective Type')

        expect(element).toBeInTheDocument();
        expect(element2).toBeInTheDocument();
        expect(element3).toBeInTheDocument();
        expect(element4).toBeInTheDocument();
        expect(element5).toBeInTheDocument();
        expect(element6).toBeInTheDocument();
        expect(element7).toBeInTheDocument();
    })
    test('3.Rendering add icon',()=>{
        render(<Mapping/>)
        const element=screen.getAllByRole('add')
        expect(element[0]).toBeInTheDocument()
    })
})