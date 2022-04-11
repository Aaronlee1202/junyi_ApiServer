import stream from 'stream'
import fastcsv from 'fast-csv'
import fs from 'fs'
import moment from 'moment'
import path from 'path'
import archiver from 'archiver'
export const csv = (data, req, res) => {
    const startDate = moment(req.params.startDate).format('MM')
    const __dirname = path.resolve()
    const dir = __dirname + '/lib/csv/file'
    // const fileName = __dirname + `/lib/csv/file/均一${startDate}~${endDate}月份報表.csv`
    const fileName = __dirname + `/lib/csv/file/均一${startDate}月份報表.csv`
    fs.rmSync(dir, { recursive: true, force: true })
    fs.mkdirSync(dir)
    data.unshift([
        'meter_id',
        'log_time',
        'log_date',
        'log_datetime',
        'freq',
        'v_a',
        'v_b',
        'v_c',
        'v_ab',
        'v_bc',
        'v_ca',
        'i_a',
        'i_b',
        'i_c',
        'p_a',
        'p_b',
        'p_c',
        'p_con',
        'p_tot',
        'pf_a',
        'pf_b',
        'pf_c',
        'pf_tot',
        'pf_avg',
        'ep_imp',
        'tot',
    ])
    // data.unshift(header)
    const outStream = new stream.PassThrough()
    const buffers = []

    csvStream
        .pipe(outStream)
        .on('data', (data) => {
            buffers.push(data)
        })
        .on('end', () => {
            // 解决MS Excel导出乱码的问题
            const dataBuffer = Buffer.concat([Buffer.from('\xEF\xBB\xBF', 'binary'), Buffer.concat(buffers)])
            fs.writeFileSync(fileName, dataBuffer)
            zipFile(fileName, `均一${startDate}月份報表.csv`, res)
        })
        .on('error', function (err) {
            reject(err)
        })
    data.unshift(header)
    data.forEach(function (row) {
        csvStream.write(row)
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
