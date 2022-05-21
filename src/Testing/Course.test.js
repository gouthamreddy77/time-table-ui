import { fireEvent, render, screen } from '@testing-library/react';
import Course from '../Components/Features/Input-Pages/Course'
describe('Testing Course Component',()=>{
    test('1.Renders Add Courses Text',()=>{
        render(<Course />);
        const element = screen.getByText(/Add Courses/i);
        expect(element).toBeInTheDocument();
    })
    test('2.Rendering placeholders correctly',()=>{
        render(<Course/>)
        const element=screen.getByPlaceholderText('Enter Course id')
        const element2=screen.getByPlaceholderText('Enter Course Name')
        const element3=screen.getByPlaceholderText('Enter Course short form')
        const element4=screen.getByDisplayValue('Select Course Type')

        expect(element).toBeInTheDocument();
        expect(element2).toBeInTheDocument();
        expect(element3).toBeInTheDocument();
        expect(element4).toBeInTheDocument();
    })
    test('3.Rendering add icon',()=>{
        render(<Course/>)
        const element=screen.getByRole('add')
        expect(element).toBeInTheDocument()
    })
    test('4.Rendering delete icon',()=>{
        render(<Course course={
            {
                course_id: "18HS1MG02",
                course_name: "Principles of Management",
                course_short_form: "PMOB",
                course_type: "lecture",
                duration: 1,
                frequency: 4,
                preferred_rooms: ""
        }}/>)
        const element=screen.getByRole('delete')
        expect(element).toBeInTheDocument()
    })
    test('5.Testing Input Room No Disabled',()=>{
        render(<Course />)
        const element = screen.getByTestId('room-no')
        expect(element.disabled).toBeTruthy()
    })
    test('6.Testing Course Type to enable/disable room no field',()=>{
        render(<Course />)
        const element = screen.getByTestId('courseType')

        fireEvent.change(element,{target:{value:'Lab'}})
        const element2 = screen.getByTestId('room-no')
        expect(element.value).toEqual('Lab')
        expect(element2.disabled).toBeFalsy()

        fireEvent.change(element,{target:{value:'Elective'}})
        expect(element2.disabled).toBeTruthy()
    })
})