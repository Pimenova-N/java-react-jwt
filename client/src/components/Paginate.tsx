import ReactPaginate from 'react-paginate';

interface Props {
    page: number;
    totalPages: number;
    handlePagination: (selectedItem: {selected:number}) => void;
}
const Paginate: React.FC<Props> = ({ page, totalPages, handlePagination }) => {

    return (

        <div className='pagination-container'>
            <ReactPaginate
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                activeClassName={"active"}
                breakLabel="..."
                nextLabel=">>>"
                onPageChange={handlePagination}
                pageRangeDisplayed={page}
                forcePage={page}
                pageCount={totalPages}
                previousLabel="<<<"
                renderOnZeroPageCount={null}
            />
        </div>
    )

}

export default Paginate;