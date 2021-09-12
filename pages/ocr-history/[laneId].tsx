import { css } from "linaria";
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableContainer,
  Pagination,
} from "carbon-components-react";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useRequiredAuth } from "@/libs/hooks";

import { useSelector, useDispatch } from "@/store/hooks";
import { doListOCRs } from "@/store/slices/container";

import { Page } from "@/components/layout/Page";

export const History = () => {
  useRequiredAuth();

  const router = useRouter();
  const query = router.query;
  const laneId = parseInt([].concat(query.laneId).shift());

  const dispatch = useDispatch();
  const total = useSelector((state) => state.container.totalOCR);
  const ocrs = useSelector((state) => state.container.ocrs);

  useEffect(() => {
    dispatch(doListOCRs({ laneId }));
  }, []);

  const headers = useMemo(
    () => [
      {
        key: "id",
        header: "ID",
      },
      {
        key: "score",
        header: "Độ chính xác",
      },
      {
        key: "imageurl",
        header: "Hình ảnh",
      },
      {
        key: "bic",
        header: "BIC",
      },
      {
        key: "serial",
        header: "Serial",
      },
      {
        key: "checksum",
        header: "Checksum",
      },
      // {
      //   key: "containerid",
      //   header: "Số container",
      // },
      {
        key: "result",
        header: "Kết quả",
      },
      {
        key: "trackingtype",
        header: "Phân loại",
      },
      {
        key: "trackingsession",
        header: "Mã ra vào",
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
          rows={ocrs as any}
          headers={headers}
          useStaticWidth={true}
          shouldShowBorder={true}
          isSortable
        >
          {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
            <TableContainer
              className={clsContainer}
              title={`Lịch sử "Cổng Vào - 1"`}
            >
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
                <TableBody className={clsBody}>
                  {rows.map((row) => (
                    <TableRow {...getRowProps({ row })}>
                      {row.cells.map((cell) => {
                        const [idx, field] = cell.id.split(":");

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

                        if (field === "score") {
                          return (
                            <TableCell key={cell.id}>
                              {Math.round(cell.value * 100)}%
                            </TableCell>
                          );
                        }

                        return (
                          <TableCell key={cell.id}>{`${cell.value}`}</TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DataTable>
      </div>
      <Pagination
        className="mt-4"
        pageSizes={[10, 20, 50, 100]}
        totalItems={total}
        onChange={({ page, pageSize }) => {
          dispatch(
            doListOCRs({
              laneId,
              limit: pageSize,
              offset: page - 1,
            })
          );
        }}
      ></Pagination>
    </Page>
  );
};

var clsBody = css`
  .bx--data-table & {
    @apply bg-white;
  }

  .bx--data-table & td {
    @apply bg-white;
  }
`;

var clsContainer = css`
  & .bx--data-table-header {
    @apply bg-white;
  }
`;

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default History;
