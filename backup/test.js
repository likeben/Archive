dispatch({
          type: 'global/addDictionary',
          payload: {
            item: { ...values, parent },
            done(err) {
              if (!err) {
                handleClose();
              }
              if (err.code === 111) {
                form.setFields({
                  value: {
                    value: values.value,
                    errors: [err],
                  },
                });
              }
            },
          },
        });
        
        
        
import Nightmare from 'nightmare';

const randomString = () => Math.random().toString(16).slice(2);

describe('dictionary page', () => {
  let nightmare = null;
  let value = '';

  beforeEach(() => {
    nightmare = new Nightmare({
      webPreferences: {
        partition: 'persist: token',
      },
      // show: true,
    });
  });

  describe('operate testing', () => {
    it('should load list successfully', async () => {
      const len = await nightmare
        .goto('http://localhost:8000/system/dictionary')
        .evaluate(() => window.localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4MWVkMjVmOTYzYjdlNTFkNmFmMzdjZiIsImVtYWlsIjoibGlqaWFueHVuQDE2My5jb20iLCJpYXQiOjE0Nzg0MjAwNjIsImV4cCI6MTQ3ODUwNjQ2Mn0.I_uUMilrZRO7pZS_iicn6CsHPwatPZ4yrt8eTah4kPs'))
        .evaluate(() => document.querySelectorAll('.ant-table-row').length)
        .end();
      expect(len).toBeGreaterThan(1);
    });
    it('missing required field name, should add dictionary failure', async () => {
      const text = await nightmare
        .goto('http://localhost:8000/system/dictionary')
        .click('.ant-btn.ant-btn-primary:nth-child(1)')
        .wait('.ant-modal-content')
        .click('.ant-btn.ant-btn-primary:nth-child(2)')
        .wait('.ant-form-explain')
        .evaluate(() => document.querySelector('.ant-form-explain').innerText)
        .end();
      expect(text).toBe('名称不能为空');
    });
    /*it('submit the existed value, should add dictionary failure', async () => {
      const text = await nightmare
        .goto('http://localhost:8000/system/dictionary')
        .click('.ant-btn.ant-btn-primary:nth-child(1)')
        .wait('.ant-modal-content')
        .insert('.ant-modal-body #name', randomString())
        .insert('#value', 'CC')
        .insert('#remark', randomString())
        .click('.ant-btn.ant-btn-primary:nth-child(2)')
        .wait('.ant-form-explain')
        .evaluate(() => document.querySelector('.ant-form-explain').innerText)
        .end();
      expect(text).toBe('该值已存在, 请使用其他的值');
    });*/
    it('should add dictionary successfully', async () => {
      value = randomString();
      const text = await nightmare
        .goto('http://localhost:8000/system/dictionary')
        .click('.ant-btn.ant-btn-primary:nth-child(1)')
        .wait('.ant-modal-content')
        .insert('.ant-modal-body #name', randomString())
        .insert('#value', value)
        .insert('#remark', randomString())
        .click('.ant-btn.ant-btn-primary:nth-child(2)')
        .wait('.ant-message-success')
        .evaluate(() => document.querySelector('.ant-message-success > span').innerText)
        .end();
      expect(text).toBe('添加成功');
    });
    /*it('enter the existed value, should add dictionary failure', async () => {
      const text = await nightmare
        .goto('http://localhost:8000/system/dictionary')
        .click('.ant-btn.ant-btn-primary:nth-child(1)')
        .wait('.ant-modal-content')
        .insert('.ant-modal-body #name', randomString())
        .insert('#value', value)
        .wait('.ant-form-explain')
        .evaluate(() => document.querySelector('.ant-form-explain').innerText)
        .end();
      expect(text).toBe('字典的值不能重复');
    });*/
    it('should add child dictionary successfully', async () => {
      const text = await nightmare
        .goto('http://localhost:8000/system/dictionary')
        .click('i.anticon.anticon-plus')
        .wait('.ant-modal-content')
        .insert('.ant-modal-body #name', randomString())
        .insert('#value', randomString())
        .insert('#remark', randomString())
        .click('.ant-btn.ant-btn-primary:nth-child(2)')
        .wait('.ant-message-success')
        .evaluate(() => document.querySelector('.ant-message-success > span').innerText)
        .end();
      expect(text).toBe('添加成功');
    });
    it('should edit dictionary successfully', async () => {
      const text = await nightmare
        .goto('http://localhost:8000/system/dictionary')
        .click('i.anticon.anticon-edit')
        .wait('.ant-modal-content')
        .insert('.ant-modal-body #name', '')
        .insert('.ant-modal-body #name', randomString())
        .click('.ant-btn.ant-btn-primary:nth-child(2)')
        .wait('.ant-message-success')
        .evaluate(() => document.querySelector('.ant-message-success > span').innerText)
        .end();
      expect(text).toBe('编辑成功');
    });
    it('should delete dictionary successfully', async () => {
      const text = await nightmare
        .goto('http://localhost:8000/system/dictionary')
        .click('i.anticon.anticon-delete')
        .wait('.ant-modal-content')
        .click('.ant-btn.ant-btn-primary:nth-child(2)')
        .wait('.ant-message-success')
        .wait(1000)
        .click('i.anticon.anticon-delete')
        .wait('.ant-modal-content')
        .click('.ant-btn.ant-btn-primary:nth-child(2)')
        .wait('.ant-message-success')
        .evaluate(() => document.querySelector('.ant-message-success > span').innerText)
        .end();
      expect(text).toBe('删除成功');
    });
    it('should search dictionary successfully', async () => {
      const len = await nightmare
        .goto('http://localhost:8000/system/dictionary')
        .insert('#name', '币种')
        .click('.ant-card-body .ant-btn.ant-btn-primary')
        .evaluate(() => document.querySelectorAll('.ant-table-row').length)
        .end();
      expect(len).toBe(1);
    });
    it('should reset filters successfully', async () => {
      const len = await nightmare
        .goto('http://localhost:8000/system/dictionary')
        .insert('#name', '币种')
        .click('.ant-card-body .ant-btn.ant-btn-primary')
        .click('.ant-card-body .ant-btn:nth-child(2)')
        .evaluate(() => document.querySelectorAll('.ant-table-row').length)
        .end();
      expect(len).toBeGreaterThan(1);
    });
  });
});
