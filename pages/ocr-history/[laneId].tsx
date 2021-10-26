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
  Toggle,
  Tooltip,
} from "carbon-components-react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useRequiredAuth } from "@/libs/hooks";

import { useSelector, useDispatch } from "@/store/hooks";
import { doListOCRs, doValidateOCR } from "@/store/slices/container";

import { Page } from "@/components/layout/Page";
import { Outside } from "@/components/Outside";

export const History = () => {
  useRequiredAuth();

  const router = useRouter();
  const query = router.query;
  const laneId = parseInt([].concat(query.laneId).shift());

  const dispatch = useDispatch();
  const total = useSelector((state) => state.container.totalOCR);
  const ocrs = useSelector((state) => state.container.ocrs);
  const lane = useSelector((state) =>
    state.setting.lanes.find((l) => l.id === laneId)
  );

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
        key: "trackingsession",
        header: "Mã ra vào",
      },
      {
        key: "trackingtype",
        header: "Phân loại",
      },
      {
        key: "isvalid",
        header: "Kết quả",
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
      <div className="flex flex-row">
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
              title={lane ? `Lịch sử "${lane.name} ${lane.gatename}"` : ""}
              description={
                lane
                  ? `ID: ${lane.id} | Cổng: ${lane.gatename} | Hướng đi: ${lane.name} `
                  : ""
              }
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
                              {/* <img
                                className="max-w-xs max-h-36 object-contain object-top my-2"
                                src={
                                  process.env.NEXT_PUBLIC_MINIO +
                                  cell.value.split("/").slice(4).join("/")
                                }
                                alt=""
                              /> */}
                              <OCRImg imagePath={cell.value} />
                            </TableCell>
                          );
                        }

                        if (field === "trackingtype") {
                          let label = "";
                          switch (cell.value) {
                            case "contID":
                              label = "Số Container";
                              break;
                            case "romoocID":
                              label = "Số Rơ moóc";
                              break;
                            case "vehicleID":
                              label = "Số Xe";
                              break;
                            default:
                              label = cell.value;
                              break;
                          }

                          return <TableCell key={cell.id}>{label}</TableCell>;
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

                        if (field === "result") {
                          return (
                            <TableCell key={cell.id}>
                              <span className="font-bold text-blue-900">
                                {cell.value}
                              </span>
                            </TableCell>
                          );
                        }

                        if (field === "trackingsession") {
                          return (
                            <TableCell key={cell.id}>
                              <span className="font-bold text-yellow-900">
                                {cell.value}
                              </span>
                            </TableCell>
                          );
                        }

                        if (field === "isvalid") {
                          return (
                            <TableCell key={cell.id}>
                              <Toggle
                                className={clsToggle}
                                id={cell.id}
                                size="sm"
                                labelA="Chưa kiểm"
                                labelB="Đúng"
                                defaultToggled={cell.value}
                                onToggle={(checked) => {
                                  dispatch(
                                    doValidateOCR({
                                      ocrID: idx,
                                      valid: checked,
                                    })
                                  );
                                }}
                                // labelText="Label text"
                              />
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
              <Pagination
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
            </TableContainer>
          )}
        </DataTable>
      </div>
    </Page>
  );
};

const OCRImg = ({ imagePath }) => {
  const [show, setShow] = useState(false);

  const parts = imagePath.split("/").slice(4);
  const imgURL = process.env.NEXT_PUBLIC_MINIO + parts.join("/");
  parts[2] = "fullsizeID";
  const fullImgURL = process.env.NEXT_PUBLIC_MINIO + parts.join("/");

  return (
    <Outside delay={10} onClick={() => setShow(false)}>
      <Tooltip
        className={clsTooltop}
        open={show}
        showIcon={false}
        triggerText={
          <img
            onClick={() => setShow(!show)}
            className="max-w-xs max-h-36 object-contain object-top my-2"
            src={imgURL}
            alt=""
          />
        }
      >
        <img
          className="max-w-lg object-contain object-top my-2"
          src={fullImgURL}
          alt=""
        />
      </Tooltip>
    </Outside>
  );
};

var clsTooltop = css`
  width: 500px;
  max-width: none;
  padding: 5px;
`;

var clsBody = css`
  .bx--data-table & {
    @apply bg-white;
  }

  .bx--data-table & td {
    @apply bg-white;
  }
`;

var clsContainer = css`
  @apply w-full;

  & .bx--data-table-header {
    @apply bg-white;
  }

  & .bx--data-table--static {
    @apply w-full;
  }
`;

var clsToggle = css`
  & .bx--toggle__switch {
    @apply my-0;
  }
`;

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default History;
