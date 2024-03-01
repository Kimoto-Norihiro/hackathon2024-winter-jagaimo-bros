import { Modal } from 'antd';
import { useRouter } from 'next/router';

type Props = {
    open: boolean;
    setOpenProgressModal: (value: boolean) => void;
}

export const ProgressModal = (props: Props) => {
    const { open, setOpenProgressModal } = props;

    const router = useRouter();
    const onCancel = () => {
        setOpenProgressModal(false);
        router.push('/top');
    }

    const { query } = router;
    const { id } = query;
    const onOk = () => {
        router.push(`/quiz/${id}`)
    }

    return (
        <Modal
            title='次の問題の業種を変更しますか？'
            okText='同じ業種で続ける'
            cancelText='業種を選択する'
            open={open}
            onCancel={onCancel}
            width={500}
            onOk={onOk}
            closable={false}
            maskClosable={false}
            okButtonProps={{
                style: {
                    backgroundColor: '#437DC5',
                    borderColor: '#437DC5',
                    color: 'white',
                }
            }}
        >
        </Modal>
    )
}
