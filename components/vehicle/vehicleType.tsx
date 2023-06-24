import { memo, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks";
import { getVehicleTypeById } from "../../redux/auth/action";

function Index({ id }) {
  const [type, setType] = useState<any>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) {
      dispatch(
        getVehicleTypeById(id, (data: any) => {
          setType(data);
        })
      );
    }
  }, [dispatch, id]);
  return <div>{type?.name}</div>;
}

export default memo(Index);
