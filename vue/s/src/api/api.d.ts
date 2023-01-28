declare namespace Api {
    interface Params {
        pagesize: number,
        page: number
    }
    interface Message {
        message: string
    }
}

declare namespace Todo {
    interface DataStruct {
        id: number,
        created_at: string,
        deleted_at: string,
        content: string | null,
        state: 0 | 1,
        title: string,
        updated_at: string
    }


    type ListResult = DataStruct[]
}
