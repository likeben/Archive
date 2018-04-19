const options = [
          {
            title: '新建',
            iconType: 'plus',
            onClick: () => handleOperate('add', record),
          }, {
            title: '编辑',
            iconType: 'edit',
            onClick: () => handleOperate('edit', record),
          }, {
            title: '删除',
            iconType: 'delete',
            onClick: () => handleOperate('delete', record),
          },
        ];

        const { children } = record;

        if (children && children.length > 0) {
          options.pop();
        }

        return <OperationButton options={options} />;