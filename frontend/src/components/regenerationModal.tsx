import { Button, Modal } from 'antd';
import { useRouter } from 'next/router';


export const RegenerationModal = () => {

    const router = useRouter();
    const onOk = () => {
        router.reload();
    }

    return (
        <Modal
            title='問題生成中にエラーが発生しました'
            open={true}
            width={500}
            closable={false}
            maskClosable={false}
            okButtonProps={{
                style: {
                    backgroundColor: "ButtonHighLight",
                    borderColor: "ButtonHighLight",
                    color: "black",
                }
            }}
            footer={[
                <Button 
                    type="primary" 
                    onClick={onOk} 
                    style={{
                        backgroundColor: '#437DC5',
                        borderColor: '#437DC5',
                        color: 'white',
                    }}
                >
                    問題を再生成する
                </Button>
            ]}
        >

        </Modal>
    )
}
