import { css } from "linaria";
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "carbon-components-react";
import { useEffect, useState, useMemo } from "react";
import { sort, descend, prop } from "ramda";
import { useRequiredAuth } from "@/libs/hooks";

import { useSelector, useDispatch } from "@/store/hooks";
import { doListTracking } from "@/store/slices/container";

import { Page } from "@/components/layout/Page";

export const History = () => {
  useRequiredAuth();

  const dispatch = useDispatch();
  const trackings = useSelector((state) => state.container.trackings);

  useEffect(() => {
    dispatch(doListTracking());
  }, []);

  const headers = useMemo(
    () => [
      {
        key: "id",
        header: "ID",
      },
      {
        key: "imageurl",
        header: "Hình ảnh",
      },
      {
        key: "containerid",
        header: "Số container",
      },
      {
        key: "createdat",
        header: "Ngày lưu",
      },
    ],
    []
  );

  return (
    <Page>
      <div className="flex flex-row justify-center">
        <DataTable
          rows={trackings as any}
          headers={headers}
          useStaticWidth={true}
          shouldShowBorder={true}
        >
          {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header, idx) => (
                    <TableHeader {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow {...getRowProps({ row })}>
                    {row.cells.map((cell) => {
                      const [idx, field] = cell.id.split(":");
                      console.log(field);

                      if (field === "imageurl") {
                        if (!cell.value) {
                          return (
                            <TableCell key={cell.id}>Không có hình</TableCell>
                          );
                        }

                        return (
                          <TableCell key={cell.id}>
                            <img
                              className="max-w-xs max-h-36 object-contain object-top my-2"
                              src={
                                process.env.NEXT_PUBLIC_MINIO +
                                cell.value.split("/").slice(4).join("/")
                              }
                              alt=""
                            />
                          </TableCell>
                        );
                      }

                      if (field === "createdat") {
                        return (
                          <TableCell key={cell.id}>
                            {new Date(cell.value * 1000).toLocaleDateString()}
                            &nbsp;
                            {new Date(cell.value * 1000).toLocaleTimeString()}
                          </TableCell>
                        );
                      }

                      return <TableCell key={cell.id}>{cell.value}</TableCell>;
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DataTable>
      </div>
    </Page>
  );
};

export default History;
