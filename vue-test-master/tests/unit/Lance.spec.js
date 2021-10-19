import Lance from '@/components/Lance';
import { mount } from '@vue/test-utils';

describe('Um lance sem valor minimo', () =>{
test('não aceita lance com valor menor do que zero', () => {
    const wrapper = mount(Lance);
    const input = wrapper.find('input');
    input.setValue(-100);
    const lancesEmitidos = wrapper.emitted('novo-lance');
    wrapper.trigger('submit');
    expect(lancesEmitidos).toBeUndefined();
});


test('emite um lance quando o valor e maior do que zero', () => {
    const wrapper = mount(Lance);
    const input = wrapper.find('input');
    input.setValue(100);
    wrapper.trigger('submit');
    const lancesEmitidos = wrapper.emitted('novo-lance');
    expect(lancesEmitidos).toHaveLength(1);
});

test('emite o valor esperado de um lance válido', () => {
    const wrapper = mount(Lance)
    const input = wrapper.find('input')
    input.setValue(100)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    // [
    //     [ 100 ]
    // ]
    const lance = parseInt(lancesEmitidos[0][0])
    expect(lance).toBe(100)
})

});

describe('Um lance com valor minimo', () => {
    test('todos os lances devem possuir um valor maior do que o minimo informado', () => {
        const wrapper = mount(Lance,{
            probsData: {
                lanceMinimo: 300
            }
        });
        const input = wrapper.find('input')
        input.setValue(400)
        wrapper.trigger('submit')
        const lancesEmitidos = wrapper.emitted('novo-lance')
        expect(lancesEmitidos).toHaveLength(1)
    })
    test('emite o valor esperado de um lance valido', () => {
        const wrapper = mount(Lance)
        const input = wrapper.find('input')
        input.setValue(400)
        wrapper.trigger('submit')
        const lancesEmitidos = wrapper.emitted('novo-lance')
        // [[400]]
        const lance = parseInt(lancesEmitidos[0][0])
        expect(lance).toBe(400)
    })
    test('Não são aceitos lances valores menores do que o minimo informado', async () => {
        const wrapper = mount(Lance, {
            propsData: {
              lanceMinimo: 300
            }
          })
          const input = wrapper.find('input')
          input.setValue(100)
          wrapper.trigger('submit')
          await wrapper.vm.$nextTick()
          const lancesEmitidos = wrapper.emitted('novo-lance')
          expect(lancesEmitidos).toBeUndefined()
          const msgErro = wrapper.find('p.alert').element.textContent
          expect(msgErro).toContain('O valor mínimo para o lance é de R$ 300')
    })
})