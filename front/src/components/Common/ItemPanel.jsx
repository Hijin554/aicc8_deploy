import React, { useEffect, useState } from 'react'; // useState 추가
import { useDispatch, useSelector } from 'react-redux';
import PageTitle from './PageTitle';
import Additem from './Additem';
import Modal from './Modal';
import Item from './item';
import { fetchGetItem } from '../../redux/slides/apiSlice';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import LodingSkeleton from './LodingSkeleton';

const ItemPanel = ({ pageTitle, filterCompleted, filteredImportant }) => {
  const dispatch = useDispatch();

  // 로딩 상태 정의
  const [loading, setLoading] = useState(false);

  // Auth Data 및 Redux 상태 가져오기
  const state = useSelector((state) => state.auth.authData);
  const userKey = state?.sub;
  const getTaskData = useSelector((state) => state.api.getItemData) || [];
  const isOpen = useSelector((state) => state.modal.isOpen);

  console.log(getTaskData)

  useEffect(() => {
    if (!userKey) return;

    const fetchGetItemsData = async () => {
      try {
        setLoading(true);
        // unwrap을 통해 비동기 통신이 완료될 때까지 기다립니다.
        await dispatch(fetchGetItem(userKey)).unwrap();
      } catch (error) {
        console.error('Fail to fetch Item:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGetItemsData();
  }, [dispatch, userKey]);
  // 1. home 메뉴를 서택할 때:
  // - all메뉴를 선택하면 첫번째 filter 조건이 true이므로 모든 task를 반환
  // - 1번에서 반환된 모든 tasks를 대상으로 두번째 filter 조건을 적용
  // - filterImportant가 undefined이면 조건이 true 이므로 모든 task를 반환


  // 2. Completed 메뉴를 선택할 때:
  // - 첫번째 필터 조건에서 if문이 false이므로 return 문으로 이동하여 filterCompleted 조건을 판단
  // - filterCompleted가 true이면 task.iscompleled가 true인 task만 반환


  // 3. Proceeding 메뉴를 선택할 때:
  // - 첫번째 필터 조건에서 if문이 false이므로 return 문으로 이동하여 filterCompleted 조건을 판단
  // - filterCompleted가 false이면 task.iscompleled가 false인 task만 반환


  // 4. Important 메뉴를 선택할 때:
  // - 첫번째 필터 조건에서 if문이 true이므로 두번째 필터 조건으로 이동
  // - 두번째 filter 조건에서 filterImportant가 없으면 true이므로 모든 task를 반환(home, Completed, Proceeding과 동일)
  // - filterImportant가 true이면 task.isimportant가 true인 task만 반환
  const filteredTasks = getTaskData.filter((task) => {
    if (filterCompleted === 'all') return true
    return filterCompleted ? task.iscompleted : !task.iscompleted
  })

    .filter((task) => {
      if (filteredImportant === 'all') return true
      return filteredImportant ? task.isimportant : !task.isimportant
    })




  return (
    <div className="panel bg-[#212121] w-4/5 h-full rounded-md border border-gray-500 py-5 px-4 overflow-y-auto">
      {userKey ? (
        <div className="w-full h-full">
          {/* 모달 열림 상태 제어 */}
          {isOpen && <Modal />}

          <PageTitle title={pageTitle} />

          <div className="flex flex-wrap mt-6">
            {loading ? (
              /* 로딩 중일 때 Skeleton UI 표시 */
              <SkeletonTheme baseColor="#313131" highlightColor="#525252" height="25vh">
                <LodingSkeleton />
                <LodingSkeleton />
                <LodingSkeleton />

              </SkeletonTheme>
            ) : (
              /* 로딩 완료 시 데이터 렌더링 */
              <>
                {filteredTasks.map((task, idx) => (
                  <Item key={task._id || idx} task={task} />
                ))}

                {/* 데이터가 로딩된 후 항상 마지막에 추가 버튼 배치 */}
                <Additem />
              </>
            )}
          </div>
        </div>
      ) : (
        /* 로그인 권한이 없을 경우 */
        <div className="login-message w-full h-full flex items-center justify-center">
          <button className="flex justify-center items-center gap-2 bg-gray-300 text-gray-900 py-2 px-6 rounded-md hover:bg-white transition-all">
            <span className="text-sm font-semibold">
              로그인이 필요한 서비스 입니다.
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemPanel;



