import stream from 'stream'
import fastcsv from 'fast-csv'
import fs from 'fs'
import moment from 'moment'
import path from 'path'
import archiver from 'archiver'
export const csv = (data, req, res) => {
    const startDate = moment(req.params.startDate).format('YYYY')
    const endDate = moment(req.params.endDate).format('MM')
    const __dirname = path.resolve()
    const dir = __dirname + '/lib/csv/file'
    // const fileName = __dirname + `/lib/csv/file/均一${startDate}~${endDate}月份報表.csv`
    const fileName = __dirname + `/lib/csv/file/均一${startDate}-${endDate}月份報表.csv`
    fs.rmSync(dir, { recursive: true, force: true })
    fs.mkdirSync(dir)

    data.unshift({
        meter_id: 'meter_id',
        log_time: 'log_time',
        log_date: 'log_date',
        log_datetime: 'log_datetime',
        freq: 'freq',
        v_a: 'v_a',
        v_b: 'v_b',
        v_c: 'v_c',
        v_ab: 'v_ab',
        v_bc: 'v_bc',
        v_ca: 'v_ca',
        i_a: 'i_a',
        i_b: 'i_b',
        i_c: 'i_c',
        p_a: 'p_a',
        p_b: 'p_b',
        p_c: 'p_c',
        p_con: 'p_con',
        p_tot: 'p_tot',
        pf_a: 'pf_a',
        pf_b: 'pf_b',
        pf_c: 'pf_c',
        pf_tot: 'pf_tot',
        pf_avg: 'pf_avg',
        ep_imp: 'ep_imp',
        tot: 'tot',
    })
    data.unshift({
        meter_id: '',
        log_time: '',
        log_date: '',
        log_datetime: '',
        freq: '頻率F (Hz)',
        v_a: 'A 相電壓VA(V)',
        v_b: 'B 相電壓VB(V)',
        v_c: 'C 相電壓VC(V)',
        v_ab: '線電壓VAB(V)',
        v_bc: '線電壓VBC(V)',
        v_ca: '線電壓VCA(V)',
        i_a: '相（線）電流IA(A)',
        i_b: '相（線）電流IB(A)',
        i_c: '相（線）電流IC(A)',
        p_a: 'A 相有功功率Pa(kW)',
        p_b: 'B 相有功功率Pb(kW)',
        p_c: 'C 相有功功率Pc(kW)',
        p_con: '系統有功功率Pcon(kW)',
        p_tot: '系統有功功率Pcon(kW)',
        pf_a: '功率因素PFA',
        pf_b: '功率因素PFB',
        pf_c: '功率因素PFC',
        pf_tot: '功率因素PFTot',
        pf_avg: '功率因素PF_AVG',
        ep_imp: '消耗有功電度Ep_imp(High Word)(kWh)',
        tot: '消耗有功電度Tot(Low Word)(kWh)',
    })

    const csvStream = fastcsv.format()
    const outStream = new stream.PassThrough()
    const buffers = []
    data.forEach(function (row) {
        csvStream.write(row)
    })
    csvStream
        .pipe(outStream)
        .on('data', (data) => {
            buffers.push(data)
        })
        .on('end', () => {
            // 解决MS Excel导出乱码的问题
            const dataBuffer = Buffer.concat([Buffer.from('\xEF\xBB\xBF', 'binary'), Buffer.concat(buffers)])
            fs.writeFileSync(fileName, dataBuffer)
            zipFile(fileName, `均一${startDate}-${endDate}月份報表.csv`, res)
        })
        .on('error', function (err) {
            reject(err)
        })
    csvStream.end()
    return
}
function zipFile(dirName, fileName2, res) {
    const __dirname = path.resolve()
    const dir = __dirname + '/lib/csv/file'
    var output = fs.createWriteStream(dir + `/均一報表.zip`)
    var archive = archiver('zip', {
        gzip: true,
        zlib: { level: 1 }, // Sets the compression level.
    })
    archive.on('error', function (err) {
        throw err
    })
    // pipe archive data to the output file
    archive.pipe(output)

    // append files
    archive.file(dirName, { name: fileName2 })

    // Wait for streams to complete
    archive.finalize().then(() => {})
    output.on('close', function () {
        res.download(dir + `/均一報表.zip`)
    })
}
