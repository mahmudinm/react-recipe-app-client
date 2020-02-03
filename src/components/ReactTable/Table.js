import React from 'react'
import { useTable, useGlobalFilter, usePagination, useFilters, useSortBy  } from 'react-table'

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      className="form-control"
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length

  return (
    <div className="form-group row">
      <label className="col-4 col-form-label">Search</label>
      <div className="col-8">
        <input
          value={globalFilter || ''}
          onChange={e => {
            setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
          }}
          className="form-control"
          placeholder={`${count} records...`}
        />
      </div>
    </div>      
  )
}

export default function Table ({ columns, data })  {

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  ) 

  const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page, // Instead of using 'rows', we'll use page,
      // which has only the rows for the active page

      // Pagination Props
      // The rest of these things are super handy, too ;)
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize, globalFilter },   

      // Search / Filtering Props
      preGlobalFilteredRows,
      setGlobalFilter,      

  } = useTable(
    {
      columns,
      data,
      initialState: { pageindex: 2 }, 
      defaultColumn,
      // filterTypes,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  )

    // Render the UI for your table
  return (
      <>
        <div className="float-right">
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </div>
        <table {...getTableProps()} className="table">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ verticalAlign: 'middle', cursor: 'pointer' }}>
                    {column.render('Header')}
                    <span>
                      &nbsp; {column.isSorted ? (column.isSortedDesc ? ' UP' : ' DOWN' ) : ''}
                    </span>
                      <div>{column.canFilter ? column.render('Filter') : null}</div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        {/* 
          Pagination can be built however you'd like. 
          This is just a very basic UI implementation:
        */}
        <div className="float-right my-3">
          <div className="btn btn-group" role="group">
            <div className="input-group">
              <select
                className="form-control"
                value={pageSize}
                onChange={e => {
                  setPageSize(Number(e.target.value))
                }}
              >
                {[10, 20, 30, 40, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>        
            </div>
            <button className="btn btn-secondary" type="button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {'<<'}
            </button>
            <button className="btn btn-secondary" type="button" onClick={() => previousPage()} disabled={!canPreviousPage}>
              {'<'}
            </button>
            <button className="btn btn-secondary" disabled>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </button>
            <button className="btn btn-secondary" type="button" onClick={() => nextPage()} disabled={!canNextPage}>
              {'>'}
            </button>
            <button className="btn btn-secondary" type="button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              {'>>'}
            </button>
          </div>
        </div>
      </>
  )
}