import Vue from 'vue';
import BubbleTip from './BubbleTip';
import Popper from 'popper.js';
import {isString} from '@sdx/utils/src/helper/tool';

function bubbleTip(opt) {
    let tip = new Vue(BubbleTip).$mount();
    tip.type = opt.type || 'warning';
    tip.content = opt.content || '';
    tip.delay = opt.delay || 5;
    tip.visible = false;
    tip.timeToClose = tip.delay;

    let refEl = opt.ref;
    if (isString(refEl)) {
        refEl = document.querySelector(refEl);
    }

    const refBox = refEl.getBoundingClientRect();

    let ref = document.createElement('div');
    ref.style.position = 'absolute';
    ref.style.left = (refBox.left + refBox.width) + 'px';
    ref.style.top = (refBox.top + refBox.height) + 'px';
    document.body.appendChild(ref);
    document.body.appendChild(tip.$el);

    const ins = {
        tip,
        close: function() {
            if (this.tip) {
                this.tip.visible = false;
                this.tip.$destroy();
                this.tip.$el.remove();
            }
            if (this.popper && this.popper.destroy) {
                this.popper.reference.remove();
                this.popper.popper.remove();
                this.popper.destroy();
            }
        }
    };

    tip.$nextTick(() => {
        tip.visible = true;
        tip.timeToClose = tip.delay;

        let popper = new Popper(ref, tip.$el, {
            placement: 'bottom-end'
        });
        popper.scheduleUpdate();

        tip._popper = popper;
        Object.defineProperty(ins, 'popper', {
            value: popper
        });

        let interval;
        interval = setInterval(() => {
            tip.timeToClose -= 1;
            if (tip.timeToClose === 0) {
                clearInterval(interval);
                tip.visible = false;
                setTimeout(() => {
                    if (tip) {
                        tip.$destroy();
                        tip.$el.remove();
                    }
                    if (popper && popper.destroy) {
                        popper.reference.remove();
                        popper.popper.remove();
                        popper.destroy();
                    }
                }, 0);
            }
        }, 1000);
    });

    return ins;
}

['warning', 'error', 'info', 'help'].forEach(type => {
    bubbleTip[type] = function(opt) {
        bubbleTip({...opt, type: type});
    };
});

bubbleTip.close = function(ins) {
    if (ins.tip) {
        ins.tip.close();
    } else {
        window.console.error('[Bubble Tip]: instances not exists!');
    }
};

export default bubbleTip;
