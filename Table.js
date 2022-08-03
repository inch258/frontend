import React from "react";
import { useTable, useGlobalFilter, useFilters,usePagination } from "react-table";
import { GlobalFilter, DefaultFilterForColumn } from "./GlobalFilter";

export default function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    state,
    visibleColumns,
    prepareRow,
    setGlobalFilter,
    preGlobalFilteredRows,
    canNextPage,
    canPreviousPage,
    previousPage,
    nextPage,
    pageOptions,
    
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultFilterForColumn },
    },
    
    useFilters,
    useGlobalFilter,
    usePagination
  );
  const { pageIndex } = state
  
  return (
    
    <>
    
      <table {...getTableProps()}   className="table table-bordered table-condensed table-responsive table-striped table-bordered"
        style={{ display: "table",fontSize:"13px" }}>
        <thead>
          <tr  >
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: "center",
                
              }}
            >
              {/* rendering global filter */}
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column,j) => (
                <th key={j}>
                  {column.render("Header")}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={i}{...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div align="center" style={{color:"black"}}>
        <span>
          Page{''}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{''}
        </span>
        <button  onClick={()=>previousPage()} disabled={!canPreviousPage} style={{padding:"7px",background:"#01A982",color:"black"}}>Previous</button>
        <button  onClick={()=>nextPage()} disabled={!canNextPage} style={{padding:"7px",background:"#01A982",color:"black"}}>Next</button>
        
      </div>
      
      
    </>
    
  );
}
